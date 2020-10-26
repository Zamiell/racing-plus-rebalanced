import Globals from "./types/Globals";

const globals = new Globals();
export default globals;

// Also make it a global variable for debugging purposes
declare let RacingPlusRebalancedGlobals: Globals;
RacingPlusRebalancedGlobals = globals;
