#!/c/Python38/python.exe

""" This script handles some miscellaneous tasks when releasing a new version of the mod. """

# Standard imports
import argparse
import json
import os
import re
import sys
import subprocess
import shutil

# Constants
DIR = os.path.dirname(os.path.realpath(__file__))
PROJECT_NAME = os.path.basename(DIR)
PACKAGE_JSON = "package.json"
PACKAGE_JSON_PATH = os.path.join(DIR, PACKAGE_JSON)
ISAACSCRIPT_JSON = "isaacscript.json"
ISAACSCRIPT_JSON_PATH = os.path.join(DIR, ISAACSCRIPT_JSON)
MOD_SOURCE_DIR = os.path.join(DIR, "mod")
METADATA_XML = "metadata.xml"
METADATA_XML_PATH = os.path.join(MOD_SOURCE_DIR, METADATA_XML)
CONSTANTS_TS = "constants.ts"
CONSTANTS_TS_FILE = os.path.join(DIR, "src", CONSTANTS_TS)
VERSION_TXT = "version.txt"
VERSION_TXT_PATH = os.path.join(MOD_SOURCE_DIR, VERSION_TXT)
UPLOADER_PATH = "C:\\Program Files (x86)\\Steam\\steamapps\\common\\The Binding of Isaac Rebirth\\tools\\ModUploader\\ModUploader.exe"


def main():
    if sys.version_info < (3, 0):
        print("This script requires Python 3.")
        sys.exit(1)

    args = parse_command_line_arguments()

    # For NPM-related things to work correctly, the current working directory must be the root of
    # the repository/project
    os.chdir(DIR)

    # Check to see if the "package.json" file exists
    if not os.path.isfile(PACKAGE_JSON_PATH):
        error(
            'Failed to find the "{}" file in the current working directory.'.format(
                PACKAGE_JSON
            )
        )

    # Check to see if the "isaacscript.json" file exists
    if not os.path.isfile(ISAACSCRIPT_JSON_PATH):
        error(
            'Failed to find the "{}" file in the current working directory.'.format(
                ISAACSCRIPT_JSON
            )
        )

    # Read the "isaacscript.json" file
    mod_target_path = get_mod_target_path()

    # Update the dependencies to the latest versions
    completed_process = subprocess.run(
        ["npx", "npm-check-updates", "--upgrade", "--packageFile", "package.json"],
        shell=True,
    )
    if completed_process.returncode != 0:
        error(
            'Failed to update the "package.json" dependencies to the latest versions.'
        )

    if args.skip_increment:
        version = get_version_from_package_json()
    else:
        version = increment_version_in_package_json()

    write_version_to_constants_ts(version)
    write_version_to_metadata_xml(version)

    # Also write out the version to the "version.txt" file
    # (so that end-users can quickly see what version of the mod that they have)
    with open(VERSION_TXT_PATH, "w", newline="\n") as file:
        file.write(version)

    # Use IsaacScript to compile and copy over the mod with the "--copy" flag
    # (this will wipe the existing directory)
    completed_process = subprocess.run(["npx", "isaacscript", "--copy"], shell=True)
    if completed_process.returncode != 0:
        error("Failed to compile & copy the mod with IsaacScript.")

    git_commit_if_changes(version)

    # Open the mod updater tool from Nicalis
    subprocess.Popen(
        [UPLOADER_PATH], cwd=mod_target_path
    )  # Popen will run it in the background

    # Done
    print("Released {} version {} successfully.".format(PROJECT_NAME, version))


def get_mod_target_path():
    with open(ISAACSCRIPT_JSON_PATH, "r") as file_handle:
        isaacscript_json = json.load(file_handle)

    if "modTargetPath" not in isaacscript_json:
        error(
            'Failed to find the "modTargetPath" field in the "{}" file.'.format(
                ISAACSCRIPT_JSON_PATH
            )
        )

    return isaacscript_json["modTargetPath"]


def parse_command_line_arguments():
    parser = argparse.ArgumentParser(
        description="Publish a new version of this package to NPM."
    )

    parser.add_argument(
        "-s",
        "--skip-increment",
        action="store_true",
        help='do not increment the version number in the "package.json" file',
    )

    return parser.parse_args()


def get_version_from_package_json():
    with open(PACKAGE_JSON_PATH, "r") as file_handle:
        package_json = json.load(file_handle)

    if "version" not in package_json:
        error('Failed to find the version in the "{}" file.'.format(PACKAGE_JSON_PATH))

    return package_json["version"]


def increment_version_in_package_json():
    with open(PACKAGE_JSON_PATH, "r") as file_handle:
        package_json = json.load(file_handle)

    if "version" not in package_json:
        error('Failed to find the version in the "{}" file.'.format(PACKAGE_JSON_PATH))

    match = re.search(r"(.+\..+\.)(.+)", package_json["version"])
    if not match:
        error(
            'Failed to parse the version number of "{}".'.format(
                package_json["version"]
            )
        )
    version_prefix = match.group(1)
    patch_version = int(match.group(2))  # i.e. the third number
    incremented_patch_version = patch_version + 1
    incremented_version = version_prefix + str(incremented_patch_version)
    package_json["version"] = incremented_version

    with open(PACKAGE_JSON_PATH, "w", newline="\n") as file_handle:
        json.dump(package_json, file_handle, indent=2, separators=(",", ": "))
        file_handle.write("\n")

    completed_process = subprocess.run(["npx", "sort-package-json"], shell=True)
    if completed_process.returncode != 0:
        error('Failed to sort the "package.json" file.')

    return incremented_version


def write_version_to_constants_ts(version):
    # http://stackoverflow.com/questions/17140886/how-to-search-and-replace-text-in-a-file-using-python
    with open(CONSTANTS_TS_FILE, "r") as file_handle:
        file_data = file_handle.read()

    new_file = ""
    for line in iter(file_data.splitlines()):
        match = re.search(r"export const VERSION = ", line)
        if match:
            new_file += 'export const VERSION = "' + version + '";\n'
        else:
            new_file += line + "\n"

    with open(CONSTANTS_TS_FILE, "w", newline="\n") as file:
        file.write(new_file)


def write_version_to_metadata_xml(version):
    with open(METADATA_XML_PATH, "r") as file_handle:
        file_data = file_handle.read()

    new_file = ""
    for line in iter(file_data.splitlines()):
        match = re.search(r"<version>", line)
        if match:
            new_file += "  <version>" + version + "</version>\n"
        else:
            new_file += line + "\n"

    with open(METADATA_XML_PATH, "w", newline="\n") as file:
        file.write(new_file)


def git_commit_if_changes(version):
    # Check to see if this is a git repository
    completed_process = subprocess.run(["git", "status"])
    if completed_process.returncode != 0:
        error("This is not a git repository.")

    # Check to see if there are any changes
    # https://stackoverflow.com/questions/3878624/how-do-i-programmatically-determine-if-there-are-uncommitted-changes
    completed_process = subprocess.run(["git", "diff-index", "--quiet", "HEAD", "--"])
    if completed_process.returncode == 0:
        # There are no changes
        return

    # Commit to the repository
    completed_process = subprocess.run(["git", "add", "-A"])
    if completed_process.returncode != 0:
        error("Failed to git add.")
    completed_process = subprocess.run(["git", "commit", "-m", version])
    if completed_process.returncode != 0:
        error("Failed to git commit.")
    completed_process = subprocess.run(["git", "push"])
    if completed_process.returncode != 0:
        error("Failed to git push.")


def error(msg):
    print("Error: {}".format(msg))
    sys.exit(1)


if __name__ == "__main__":
    main()
