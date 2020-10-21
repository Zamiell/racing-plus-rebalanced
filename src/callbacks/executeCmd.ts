import debug from "../debug";

export function main(command: string): void {
  if (command === "d") {
    debug();
  }
}
