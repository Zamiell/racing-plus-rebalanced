declare let ___LUA_ERROR_BACKUP: any;

export default () => {
  // Backup the vanilla Lua error function
  if (___LUA_ERROR_BACKUP === undefined) {
    ___LUA_ERROR_BACKUP = error;
  }

  // Replace Lua's error function with something that actually displays the output
  // @ts-ignore
  /** @noSelf */ error = (err: string) => {
    if (err === "") {
      Isaac.DebugString("Lua error (with a blank error message)");
    } else {
      Isaac.DebugString(`Lua error: ${err}`);
    }

    // If the end-user does not have the "--luadebug" flag turned on in the Steam launch options,
    // the debug library will be equal to nil
    // @ts-ignore
    if (debug !== undefined) {
      const tracebackLines = debug.traceback().split("\n");
      for (let i = 0; i < tracebackLines.length; i++) {
        const line = tracebackLines[i];
        if (i === 0 || i === 1) {
          // The first line is always "stack traceback:"
          // The second line is always this line, e.g. "in function 'error'", which is not useful
          continue;
        }
        if (i === 1 && string.match(line, "in function 'error'")) {
          continue;
        }
        Isaac.DebugString(line);
      }
    }

    // Call the real Lua "error" function, which will prevent this function from returning
    // (and subsequent code from firing)
    ___LUA_ERROR_BACKUP();
  };
};
