import GlobalsRunHealth from "./GlobalsRunHealth";
import GlobalsRunLastHealth from "./GlobalsRunLastHealth";
import GlobalsRunLevel from "./GlobalsRunLevel";
import GlobalsRunPills from "./GlobalsRunPills";
import GlobalsRunRoom from "./GlobalsRunRoom";

// Per-run variables
export default class GlobalsRun {
  // Tracking per run
  randomSeed: int = 0;
  tearCounter: int = 0;

  // Tracking per level
  currentFloor: int = 0;
  currentFloorType: int = 0;
  currentFloorFrame: int = 0;
  level = new GlobalsRunLevel();

  // Tracking per room
  currentRoomClearState = true;
  room = new GlobalsRunRoom();

  // Miscellaneous variables
  pickingUpItem: int = 0; // Equal to the ID of the currently queued item
  pickingUpItemRoom: int = 0; // Equal to the room that we picked up the currently queued item
  pickingUpItemType: ItemType = ItemType.ITEM_NULL; // Equal to the "QueuedItem.Item.Type"
  lastFireDirection: Direction = Direction.DOWN;
  dealingExtraDamage = false;
  familiarMultiShot: int = 0;
  familiarMultiShotVelocity = Vector(0, 0);
  rouletteTableRNG: int = 0;

  // Item variables
  monstroCounters: int = 0; // For Monstro's Tooth (86)
  monstroFrame: int = 0; // For Monstro's Tooth (86)
  wafer = false; // For The Wafer (108)
  waferCounters: int = 0; // For The Wafer (108)
  knifeCooldownFrames: int = 0; // For Mom's Knife (114)
  nineVoltFrame: int = 0; // For 9 Volt (116)
  spawningDeadBird = false; // For Dead Bird (117)
  blackBeanEndFrame: int = 0; // For The Black Bean (180)
  abelDoubleTear = false; // For Abel (188)
  fannyPackRNG: int = 0; // For Fanny Pack (204)
  piggyBankRNG: int = 0; // For Piggy Bank (227)
  technologyAdded2020 = false; // For 20/20 (245)
  spawningIsaacsHeartLaser = false; // For the Isaac's Heart (276)
  judasShadow = false; // For Judas' Shadow (311)
  holyMantle = false; // For Holy Mantle (313)
  wizDoubleTear = false; // For The Wiz (358)
  chargedBabyCounters: int = 0; // For Charged Baby (372)
  fartingBabyCounters: int = 0; // For Farting Baby (404)
  blackPowderActive = false; // For Black Powder (420)
  brownNuggetCounters: int = 0; // For Brown Nugget (504)
  brownNuggetFrame: int = 0; // For Brown Nugget (504)
  walnutCounters: int = 0; // For Walnut (108)
  spawningRestock = false; // For Clockwork Assembly
  strabismusDoubleTear = false; // For Strabismus
  catalogRNG: int = 0;

  // Trinket variables
  etherealPennyRNG: int = 0; // For Ethereal Penny
  numCoins: int = 0; // For Penny on a String

  // Card variables
  wheelOfFortuneRNG: int = 0; // For the Wheel of Fortune card (11)
  sunCardRNG: int = 0; // For the Sun card (20)

  // Pill variables
  pills: GlobalsRunPills = {
    // The randomly selected pill effects for this run
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
  health: GlobalsRunHealth = {
    hearts: 0,
    maxHearts: 0,
    soulHearts: 0,
    blackHearts: 0,
    boneHearts: 0,
    changedOnThisFrame: false,
    restoredLastHealthOnThisFrame: false,
  };

  lastHealth: GlobalsRunLastHealth = {
    hearts: 0,
    maxHearts: 0,
    soulHearts: 0,
    blackHearts: 0,
    boneHearts: 0,
  };

  // Transformations
  transformations = new Map<PlayerForm, boolean>();

  init(startSeed: int): void {
    this.randomSeed = startSeed;
    this.rouletteTableRNG = startSeed;
    this.fannyPackRNG = startSeed; // For Fanny Pack (204)
    this.piggyBankRNG = startSeed; // For Piggy Bank (227)
    this.catalogRNG = startSeed;
    this.etherealPennyRNG = startSeed; // For Ethereal Penny
    this.wheelOfFortuneRNG = startSeed; // For the Wheel of Fortune card (11)

    for (let i = 0; i < PlayerForm.NUM_PLAYER_FORMS; i++) {
      this.transformations.set(i, false);
    }
  }
}
