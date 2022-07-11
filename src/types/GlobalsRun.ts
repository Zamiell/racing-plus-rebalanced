import { Direction, PillColor, PillEffect } from "isaac-typescript-definitions";
import { newPlayerHealth, newRNG } from "isaacscript-common";
import GlobalsRunLevel from "./GlobalsRunLevel";
import GlobalsRunPills from "./GlobalsRunPills";
import GlobalsRunRoom from "./GlobalsRunRoom";

// Per-run variables
export default class GlobalsRun {
  // Tracking per run
  randomSeed = 1 as Seed;
  tearCounter = 0;

  // Tracking per level. We start at 0 instead of 1 so that we can trigger the `POST_NEW_ROOM`
  // callback after the `POST_NEW_LEVEL` callback.
  level = new GlobalsRunLevel(0, 0, 0);

  // Tracking per room
  room = new GlobalsRunRoom();

  // Miscellaneous variables
  lastFireDirection = Direction.DOWN;
  dealingExtraDamage = false;
  familiarMultiShot = 0;
  familiarMultiShotVelocity = Vector(0, 0);
  rouletteTableRNG = newRNG();

  // Item variables
  monstroCounters = 0; // For Monstro's Tooth (86)
  monstroFrame = 0; // For Monstro's Tooth (86)
  wafer = false; // For The Wafer (108)
  waferCounters = 0; // For The Wafer (108)
  knifeCooldownFrames = 0; // For Mom's Knife (114)
  nineVoltFrame = 0; // For 9 Volt (116)
  spawningDeadBird = false; // For Dead Bird (117)
  blackBeanEndFrame = 0; // For The Black Bean (180)
  abelDoubleTear = false; // For Abel (188)
  fannyPackRNG = newRNG(); // For Fanny Pack (204)
  piggyBankRNG = newRNG(); // For Piggy Bank (227)
  technologyAdded2020 = false; // For 20/20 (245)
  spawningIsaacsHeartLaser = false; // For the Isaac's Heart (276)
  judasShadow = false; // For Judas' Shadow (311)
  holyMantle = false; // For Holy Mantle (313)
  wizDoubleTear = false; // For The Wiz (358)
  chargedBabyCounters = 0; // For Charged Baby (372)
  fartingBabyCounters = 0; // For Farting Baby (404)
  blackPowderActive = false; // For Black Powder (420)
  brownNuggetCounters = 0; // For Brown Nugget (504)
  brownNuggetFrame = 0; // For Brown Nugget (504)
  walnutCounters = 0; // For Walnut (108)
  spawningRestock = false; // For Clockwork Assembly
  strabismusDoubleTear = false; // For Strabismus
  catalogRNG = newRNG();

  // Trinket variables
  etherealPennyRNG = newRNG(); // For Ethereal Penny
  numCoins = 0; // For Penny on a String

  // Card variables
  wheelOfFortuneRNG = newRNG(); // For the Wheel of Fortune card (11)
  sunCardRNG = newRNG(); // For the Sun card (20)

  // Pill variables
  pills: GlobalsRunPills = {
    // The randomly selected pill effects for this run.
    effects: new Map<PillColor, PillEffect>(),

    // Stat up counters
    damageUp: 0,
    tearDelayDown: 0,

    // Timers
    superSadness: 0,
    invincibility: 0,
    reallyBadGas: 0,
    aether: 0,
    aetherAngle: 0,
    wallsHaveEyes: 0,
    wallsHaveEyesShooting: false,
    bladderInfection: 0,
    scorchedEarth: 0,
    familiarFrenzy: 0,
  };

  // Health tracking
  health = {
    health: newPlayerHealth(),
    changedOnThisFrame: false,
    restoredLastHealthOnThisFrame: false,
  };

  lastHealth = newPlayerHealth();

  constructor(startSeed: Seed) {
    this.randomSeed = startSeed;
    this.rouletteTableRNG = newRNG(startSeed);
    this.fannyPackRNG = newRNG(startSeed); // For Fanny Pack (204)
    this.piggyBankRNG = newRNG(startSeed); // For Piggy Bank (227)
    this.catalogRNG = newRNG(startSeed);
    this.etherealPennyRNG = newRNG(startSeed); // For Ethereal Penny
    this.wheelOfFortuneRNG = newRNG(startSeed); // For the Wheel of Fortune card (11)
  }
}
