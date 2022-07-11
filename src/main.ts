import { log, ModUpgraded, upgradeMod } from "isaacscript-common";
import * as entityTakeDmg from "./callbacks/entityTakeDmg";
import * as getCard from "./callbacks/getCard";
import * as getPillColor from "./callbacks/getPillColor";
import * as getPillEffect from "./callbacks/getPillEffect";
import * as postBombUpdate from "./callbacks/postBombUpdate";
import * as postEffectUpdate from "./callbacks/postEffectUpdate";
import * as familiarUpdate from "./callbacks/postFamiliarUpdate";
import * as postFireTear from "./callbacks/postFireTear";
import * as postKnifeUpdate from "./callbacks/postKnifeUpdate";
import * as postLaserInit from "./callbacks/postLaserInit";
import * as postLaserUpdate from "./callbacks/postLaserUpdate";
import * as postNPCUpdate from "./callbacks/postNPCUpdate";
import * as postPickupInit from "./callbacks/postPickupInit";
import * as postPickupRender from "./callbacks/postPickupRender";
import * as postPickupUpdate from "./callbacks/postPickupUpdate";
import * as postProjectileUpdate from "./callbacks/postProjectileUpdate";
import * as postRender from "./callbacks/postRender";
import * as postTearUpdate from "./callbacks/postTearUpdate";
import * as postUpdate from "./callbacks/postUpdate";
import * as postUseCard from "./callbacks/postUseCard";
import * as postUseItem from "./callbacks/postUseItem";
import * as postUsePill from "./callbacks/postUsePill";
import * as preEntitySpawn from "./callbacks/preEntitySpawn";
import * as preFamiliarCollision from "./callbacks/preFamiliarCollision";
import * as preProjectileCollision from "./callbacks/preProjectileCollision";
import * as preTearCollision from "./callbacks/preTearCollision";
import * as preUseItem from "./callbacks/preUseItem";
import * as postGameStartedReordered from "./callbacksCustom/postGameStartedReordered";
import * as postNewLevelReordered from "./callbacksCustom/postNewLevelReordered";
import * as postNewRoomReordered from "./callbacksCustom/postNewRoomReordered";
import { MOD_NAME, VERSION } from "./constants";

main();

function main() {
  const modVanilla = RegisterMod(MOD_NAME, 1);
  const mod = upgradeMod(modVanilla);

  welcomeBanner();
  addCallbacks(mod);
  addCustomCallbacks(mod);
}

function welcomeBanner() {
  const welcomeText = `${MOD_NAME} ${VERSION} initialized.`;
  const hyphens = "-".repeat(welcomeText.length);
  const welcomeTextBorder = `+-${hyphens}-+`;
  log(welcomeTextBorder);
  log(`| ${welcomeText} |`);
  log(welcomeTextBorder);
}

function addCallbacks(mod: Mod) {
  postNPCUpdate.init(mod); // 0
  postUpdate.init(mod); // 1
  postRender.init(mod); // 2
  postUseItem.init(mod); // 3
  postUseCard.init(mod); // 5
  postUsePill.init(mod); // 10
  entityTakeDmg.init(mod); // 11
  getCard.init(mod); // 20
  preUseItem.init(mod); // 23
  preEntitySpawn.init(mod); // 24
  preFamiliarCollision.init(mod); // 26
  postPickupInit.init(mod); // 34
  postPickupUpdate.init(mod); // 35
  postPickupRender.init(mod); // 36
  postTearUpdate.init(mod); // 40
  preTearCollision.init(mod); // 42
  postProjectileUpdate.init(mod); // 44
  preProjectileCollision.init(mod); // 46
  postLaserInit.init(mod); // 47
  postLaserUpdate.init(mod); // 48
  postKnifeUpdate.init(mod); // 51
  postEffectUpdate.init(mod); // 55
  familiarUpdate.init(mod); // 56
  postBombUpdate.init(mod); // 58
  postFireTear.init(mod); // 61
  getPillColor.init(mod); // 64
  getPillEffect.init(mod); // 65
}

function addCustomCallbacks(mod: ModUpgraded) {
  postGameStartedReordered.init(mod);
  postNewLevelReordered.init(mod);
  postNewRoomReordered.init(mod);
}

// TODO
// - remove all "null"
// - remove all "math.random"
