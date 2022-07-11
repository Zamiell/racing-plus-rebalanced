import {
  CacheFlag,
  CollectibleType,
  LevelStage,
  ModCallback,
  TrinketType,
} from "isaac-typescript-definitions";
import { CollectibleTypeCustom } from "../enums/CollectibleTypeCustom";
import g from "../globals";

const TINY_PLANET_EXCEPTION_COLLECTIBLE_TYPES: readonly CollectibleType[] = [
  CollectibleType.EPIC_FETUS, // 168
  CollectibleType.LUDOVICO_TECHNIQUE, // 329
  CollectibleType.TECH_X, // 395
];

export function init(mod: Mod): void {
  mod.AddCallback(
    ModCallback.EVALUATE_CACHE,
    damage,
    CacheFlag.DAMAGE, // 1
  );

  mod.AddCallback(
    ModCallback.EVALUATE_CACHE,
    fireDelay,
    CacheFlag.FIRE_DELAY, // 2
  );

  mod.AddCallback(
    ModCallback.EVALUATE_CACHE,
    shotSpeed,
    CacheFlag.SHOT_SPEED, // 4
  );

  mod.AddCallback(
    ModCallback.EVALUATE_CACHE,
    speed,
    CacheFlag.SPEED, // 16
  );

  mod.AddCallback(
    ModCallback.EVALUATE_CACHE,
    luck,
    CacheFlag.LUCK, // 1024
  );
}

export function damage(player: EntityPlayer): void {
  damageItems(player);
  damageTrinkets(player);
  damagePills(player);
  damageGlobalPenalty(player);
}

function damageItems(player: EntityPlayer) {
  // 52
  if (player.HasCollectible(CollectibleType.DR_FETUS)) {
    player.Damage *= 1.2;
  }

  // 149
  if (player.HasCollectible(CollectibleType.IPECAC)) {
    player.Damage *= 0.8;
  }

  // 114
  if (
    player.HasCollectible(CollectibleType.MOMS_KNIFE) &&
    !player.HasCollectible(CollectibleType.EPIC_FETUS)
  ) {
    player.Damage *= 0.7;
  }

  // 233
  if (
    player.HasCollectible(CollectibleType.TINY_PLANET) &&
    !hasTinyPlanetExceptionItem(player)
  ) {
    player.Damage *= 1.5;
  }

  // 276
  if (player.HasCollectible(CollectibleType.ISAACS_HEART)) {
    player.Damage *= 0.8;
  }

  // 329
  if (
    player.HasCollectible(CollectibleType.LUDOVICO_TECHNIQUE) &&
    !player.HasCollectible(CollectibleType.EPIC_FETUS) &&
    !player.HasCollectible(CollectibleType.TECH_X) &&
    !player.HasCollectible(CollectibleType.HAEMOLACRIA)
  ) {
    player.Damage *= 3;
  }

  // 330
  if (player.HasCollectible(CollectibleType.SOY_MILK)) {
    player.Damage *= 3.5;
  }

  // 331
  if (player.HasCollectible(CollectibleType.GODHEAD)) {
    player.Damage *= 0.9;
  }

  // 420
  if (
    player.HasCollectible(CollectibleType.BLACK_POWDER) &&
    g.run.blackPowderActive
  ) {
    player.Damage *= 1.5;
  }

  // Replacing 493
  if (player.HasCollectible(CollectibleTypeCustom.ADRENALINE_IMPROVED)) {
    const hearts = player.GetHearts();
    const soulHearts = player.GetSoulHearts();
    const boneHearts = player.GetBoneHearts();
    const numHits = hearts + soulHearts + boneHearts;

    if (numHits === 1) {
      player.Damage *= 2;
    } else if (numHits === 2) {
      player.Damage *= 1.5;
    } else if (numHits === 3) {
      player.Damage *= 1.25;
    } else if (numHits === 4) {
      player.Damage *= 1.125;
    }
  }
}

function damageTrinkets(player: EntityPlayer) {
  // 11
  if (player.HasTrinket(TrinketType.RING_WORM)) {
    player.Damage *= 1.25;
  }
}

function damagePills(player: EntityPlayer) {
  player.Damage += g.run.pills.damageUp;
}

function damageGlobalPenalty(player: EntityPlayer) {
  const stage = g.l.GetStage();

  // For the purposes of the global damage penalty, Blue Womb should not count as a floor, meaning
  // that Womb 2 is stage 8 and Cathedral is stage 9.
  const adjustedStage =
    stage >= LevelStage.BLUE_WOMB
      ? (((stage as int) - 1) as LevelStage)
      : stage;
  const stagePenalty = (((adjustedStage as int) - 1) / 9) * 0.3; // From 0% on stage 1 to 30% on stage 10
  player.Damage *= 1 - stagePenalty;
}

export function fireDelay(player: EntityPlayer): void {
  fireDelayItems(player);
  fireDelayPills(player);
}

function fireDelayItems(player: EntityPlayer) {
  const hearts = player.GetHearts();

  // 2
  if (
    player.HasCollectible(CollectibleType.INNER_EYE) &&
    !player.HasCollectible(CollectibleTypeCustom.MUTANT_SPIDER_INNER_EYE)
  ) {
    player.MaxFireDelay -= 4;
  }

  // 5
  if (player.HasCollectible(CollectibleType.MY_REFLECTION)) {
    player.MaxFireDelay -= 2;
  }

  // 48
  if (player.HasCollectible(CollectibleType.CUPIDS_ARROW)) {
    player.MaxFireDelay -= 1;
  }

  // 233
  if (
    player.HasCollectible(CollectibleType.TINY_PLANET) &&
    !hasTinyPlanetExceptionItem(player)
  ) {
    player.MaxFireDelay -= 4;
  }

  // 276
  if (player.HasCollectible(CollectibleType.ISAACS_HEART)) {
    player.MaxFireDelay = math.ceil(player.MaxFireDelay * 2);
  }

  // 310
  if (player.HasCollectible(CollectibleType.EVES_MASCARA)) {
    player.MaxFireDelay -= 1;
  }

  // 315
  if (player.HasCollectible(CollectibleType.STRANGE_ATTRACTOR)) {
    player.MaxFireDelay -= 2;
  }

  // 358
  if (player.HasCollectible(CollectibleType.THE_WIZ)) {
    player.MaxFireDelay -= 1;
  }

  // 394
  if (player.HasCollectible(CollectibleType.MARKED)) {
    player.MaxFireDelay -= 2;
  }

  // 401
  if (player.HasCollectible(CollectibleType.EXPLOSIVO)) {
    player.MaxFireDelay -= 2;
  }

  // 441
  if (player.HasCollectible(CollectibleType.KIDNEY_STONE)) {
    player.MaxFireDelay -= 1;
  }

  // 444
  if (
    player.HasCollectible(CollectibleType.DARK_PRINCES_CROWN) &&
    hearts === 2
  ) {
    player.MaxFireDelay -= 2;
  }

  // 529
  if (player.HasCollectible(CollectibleType.POP)) {
    player.MaxFireDelay -= 1;
  }

  // 531
  if (player.HasCollectible(CollectibleType.HAEMOLACRIA)) {
    player.MaxFireDelay -= 14;
  }

  // 540
  if (player.HasCollectible(CollectibleType.FLAT_STONE)) {
    player.MaxFireDelay -= 1;
  }
}

function fireDelayPills(player: EntityPlayer) {
  player.MaxFireDelay -= g.run.pills.tearDelayDown;
  if (g.run.pills.superSadness !== 0) {
    player.MaxFireDelay -= 6;
  }
}

export function shotSpeed(player: EntityPlayer): void {
  shotSpeedItems(player);
}

function shotSpeedItems(player: EntityPlayer) {
  // 310
  if (player.HasCollectible(CollectibleType.EVES_MASCARA)) {
    player.ShotSpeed += 0.5;
  }

  // 533
  if (player.HasCollectible(CollectibleType.TRISAGION)) {
    player.ShotSpeed -= 0.35;
  }
}

export function speed(player: EntityPlayer): void {
  speedItems(player);
}

function speedItems(player: EntityPlayer) {
  // 13
  if (player.HasCollectible(CollectibleType.VIRUS)) {
    player.MoveSpeed += 0.1;
  }

  // 121
  if (player.HasCollectible(CollectibleType.ODD_MUSHROOM_LARGE)) {
    player.MoveSpeed += 0.1;
  }

  // 299
  if (player.HasCollectible(CollectibleType.TAURUS)) {
    // In vanilla, Taurus gives -0.3 speed We want it to grant 0.2 speed.
    player.MoveSpeed += 0.5;
  }

  // 302
  if (player.HasCollectible(CollectibleType.LEO)) {
    player.MoveSpeed += 0.1;
  }

  // 441
  if (player.HasCollectible(CollectibleType.KIDNEY_STONE)) {
    player.MoveSpeed += 0.2;
  }
}

export function luck(player: EntityPlayer): void {
  luckItems(player);
}

function luckItems(player: EntityPlayer) {
  // 87
  if (player.HasCollectible(CollectibleType.LOKIS_HORNS)) {
    player.Luck += 7;
  }
}

function hasTinyPlanetExceptionItem(player: EntityPlayer): boolean {
  for (const collectibleType of TINY_PLANET_EXCEPTION_COLLECTIBLE_TYPES) {
    if (player.HasCollectible(collectibleType)) {
      return true;
    }
  }

  return false;
}
