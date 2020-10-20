import Globals from "./types/Globals";

const globals = new Globals();
export default globals;

// Also make it a global variable for debugging purposes
declare global {
  let RacingPlusRebalancedGlobals: Globals;
}
RacingPlusRebalancedGlobals = globals;
