import Shockwave from "./Shockwave";
import Tear from "./Tear";

// Per-room variables
export default class GlobalsRunRoom {
  doubleItemsFrame = 0;
  softlock = false;
  knifeFlying = new Map<int, boolean>();
  knifePositions = new Map<int, Vector>();
  mongoBabyTears: Tear[] = []; // For Mongo Baby (322)
  fartingBabyShockwaves: Shockwave[] = []; // For Farting Baby (404)
}
