import g from "../globals";
import { CollectibleTypeCustom } from "../types/enums.custom";

const TINY_PLANET_EXCEPTION_ITEMS = [
  CollectibleType.COLLECTIBLE_EPIC_FETUS, // 168
  CollectibleType.COLLECTIBLE_LUDOVICO_TECHNIQUE, // 329
  CollectibleType.COLLECTIBLE_TECH_X, // 395
];

export function damage(player: EntityPlayer): void {
  damageItems(player);
  damageTrinkets(player);
  damagePills(player);
  damageGlobalPenalty(player);
}

function damageItems(player: EntityPlayer) {
  // 52
  if (player.HasCollectible(CollectibleType.COLLECTIBLE_DR_FETUS)) {
    player.Damage *= 1.2;
  }

  // 149
  if (player.HasCollectible(CollectibleType.COLLECTIBLE_IPECAC)) {
    player.Damage *= 0.8;
  }

  // 114
  if (
    player.HasCollectible(CollectibleType.COLLECTIBLE_MOMS_KNIFE) &&
    !player.HasCollectible(CollectibleType.COLLECTIBLE_EPIC_FETUS)
  ) {
    player.Damage *= 0.7;
  }

  // 233
  if (
    player.HasCollectible(CollectibleType.COLLECTIBLE_TINY_PLANET) &&
    !hasTinyPlanetExceptionItem()
  ) {
    player.Damage *= 1.5;
  }

  // 276
  if (player.HasCollectible(CollectibleType.COLLECTIBLE_ISAACS_HEART)) {
    player.Damage *= 0.8;
  }

  // 329
  if (
    player.HasCollectible(CollectibleType.COLLECTIBLE_LUDOVICO_TECHNIQUE) &&
    !player.HasCollectible(CollectibleType.COLLECTIBLE_EPIC_FETUS) &&
    !player.HasCollectible(CollectibleType.COLLECTIBLE_TECH_X) &&
    !player.HasCollectible(CollectibleType.COLLECTIBLE_HAEMOLACRIA)
  ) {
    player.Damage *= 3;
  }

  // 330
  if (player.HasCollectible(CollectibleType.COLLECTIBLE_SOY_MILK)) {
    player.Damage *= 3.5;
  }

  // 331
  if (player.HasCollectible(CollectibleType.COLLECTIBLE_GODHEAD)) {
    player.Damage *= 0.9;
  }

  // 420
  if (
    player.HasCollectible(CollectibleType.COLLECTIBLE_BLACK_POWDER) &&
    g.run.blackPowderActive
  ) {
    player.Damage *= 1.5;
  }

  // Replacing 493
  if (
    player.HasCollectible(CollectibleTypeCustom.COLLECTIBLE_ADRENALINE_IMPROVED)
  ) {
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
  if (player.HasTrinket(TrinketType.TRINKET_RING_WORM)) {
    player.Damage *= 1.25;
  }
}

function damagePills(player: EntityPlayer) {
  player.Damage += g.run.pills.damageUp;
}

function damageGlobalPenalty(player: EntityPlayer) {
  // Local variables
  const stage = g.l.GetStage();

  // For the purposes of the global damage penalty, Blue Womb should not count as a floor
  // Meaning that Womb 2 is stage 8 and Cathedral is stage 9
  const adjustedStage = stage >= 9 ? stage - 1 : stage;
  const stagePenalty = ((adjustedStage - 1) / 9) * 0.3; // From 0% on stage 1 to 30% on stage 10
  player.Damage *= 1 - stagePenalty;
}

export function fireDelay(player: EntityPlayer): void {
  fireDelayItems(player);
  fireDelayPills(player);
}

function fireDelayItems(player: EntityPlayer) {
  // Local variables
  const hearts = player.GetHearts();

  // 2
  if (
    player.HasCollectible(CollectibleType.COLLECTIBLE_INNER_EYE) &&
    !player.HasCollectible(
      CollectibleTypeCustom.COLLECTIBLE_MUTANT_SPIDER_INNER_EYE,
    )
  ) {
    player.MaxFireDelay -= 4;
  }

  // 5
  if (player.HasCollectible(CollectibleType.COLLECTIBLE_MY_REFLECTION)) {
    player.MaxFireDelay -= 2;
  }

  // 48
  if (player.HasCollectible(CollectibleType.COLLECTIBLE_CUPIDS_ARROW)) {
    player.MaxFireDelay -= 1;
  }

  // 233
  if (
    player.HasCollectible(CollectibleType.COLLECTIBLE_TINY_PLANET) &&
    !hasTinyPlanetExceptionItem()
  ) {
    player.MaxFireDelay -= 4;
  }

  // 276
  if (player.HasCollectible(CollectibleType.COLLECTIBLE_ISAACS_HEART)) {
    player.MaxFireDelay = math.ceil(player.MaxFireDelay * 2);
  }

  // 310
  if (player.HasCollectible(CollectibleType.COLLECTIBLE_EVES_MASCARA)) {
    player.MaxFireDelay -= 1;
  }

  // 315
  if (player.HasCollectible(CollectibleType.COLLECTIBLE_STRANGE_ATTRACTOR)) {
    player.MaxFireDelay -= 2;
  }

  // 358
  if (player.HasCollectible(CollectibleType.COLLECTIBLE_THE_WIZ)) {
    player.MaxFireDelay -= 1;
  }

  // 394
  if (player.HasCollectible(CollectibleType.COLLECTIBLE_MARKED)) {
    player.MaxFireDelay -= 2;
  }

  // 401
  if (player.HasCollectible(CollectibleType.COLLECTIBLE_EXPLOSIVO)) {
    player.MaxFireDelay -= 2;
  }

  // 441
  if (player.HasCollectible(CollectibleType.COLLECTIBLE_KIDNEY_STONE)) {
    player.MaxFireDelay -= 1;
  }

  // 444
  if (
    player.HasCollectible(CollectibleType.COLLECTIBLE_DARK_PRINCESS_CROWN) &&
    hearts === 2
  ) {
    player.MaxFireDelay -= 2;
  }

  // 529
  if (player.HasCollectible(CollectibleType.COLLECTIBLE_POP)) {
    player.MaxFireDelay -= 1;
  }

  // 531
  if (player.HasCollectible(CollectibleType.COLLECTIBLE_HAEMOLACRIA)) {
    player.MaxFireDelay -= 14;
  }

  // 540
  if (player.HasCollectible(CollectibleType.COLLECTIBLE_FLAT_STONE)) {
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
  if (player.HasCollectible(CollectibleType.COLLECTIBLE_EVES_MASCARA)) {
    player.ShotSpeed += 0.5;
  }

  // 533
  if (player.HasCollectible(CollectibleType.COLLECTIBLE_TRISAGION)) {
    player.ShotSpeed -= 0.35;
  }
}

export function speed(player: EntityPlayer): void {
  speedItems(player);
}

function speedItems(player: EntityPlayer) {
  // 13
  if (player.HasCollectible(CollectibleType.COLLECTIBLE_VIRUS)) {
    player.MoveSpeed += 0.1;
  }

  // 121
  if (player.HasCollectible(CollectibleType.COLLECTIBLE_ODD_MUSHROOM_DAMAGE)) {
    player.MoveSpeed += 0.1;
  }

  // 299
  if (player.HasCollectible(CollectibleType.COLLECTIBLE_TAURUS)) {
    // In vanilla, Taurus gives -0.3 speed
    // We want it to grant 0.2 speed
    player.MoveSpeed += 0.5;
  }

  // 302
  if (player.HasCollectible(CollectibleType.COLLECTIBLE_LEO)) {
    player.MoveSpeed += 0.1;
  }

  // 441
  if (player.HasCollectible(CollectibleType.COLLECTIBLE_KIDNEY_STONE)) {
    player.MoveSpeed += 0.2;
  }
}

export function luck(player: EntityPlayer): void {
  luckItems(player);
}

function luckItems(player: EntityPlayer) {
  // 87
  if (player.HasCollectible(CollectibleType.COLLECTIBLE_LOKIS_HORNS)) {
    player.Luck += 7;
  }
}

function hasTinyPlanetExceptionItem(): boolean {
  for (const item of TINY_PLANET_EXCEPTION_ITEMS) {
    if (g.p.HasCollectible(item)) {
      return true;
    }
  }

  return false;
}
