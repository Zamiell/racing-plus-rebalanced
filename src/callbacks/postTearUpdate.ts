import { FAMILIAR_TEAR_DAMAGE } from "../constants";
import g from "../globals";
import { CollectibleTypeCustom } from "../types/enums.custom";

export function main(tear: EntityTear): void {
  bobsRottenHead(tear); // 42
  demonBaby(tear); // 113
  abel(tear); // 188
  tinyPlanet(tear); // 233
  explosivo(tear); // 401
  lilMonstro(tear); // 471
  fireMindImproved(tear); // Replacing 257
}

// CollectibleType.COLLECTIBLE_BOBS_ROTTEN_HEAD (42)
function bobsRottenHead(tear: EntityTear) {
  if (
    tear.Variant === TearVariant.BOBS_HEAD &&
    tear.FrameCount === 1 // If we do it on frame 0, the charge won't work
  ) {
    tear.TearFlags |= TearFlags.TEAR_SAD_BOMB;
    g.p.SetActiveCharge(1);
  }
}

// CollectibleType.COLLECTIBLE_DEMON_BABY (113)
function demonBaby(tear: EntityTear) {
  if (
    tear.FrameCount === 1 &&
    tear.SpawnerType === EntityType.ENTITY_FAMILIAR &&
    tear.SpawnerVariant === FamiliarVariant.DEMON_BABY
  ) {
    tear.CollisionDamage = 7 + g.p.Damage * 0.33;
  }
}

// CollectibleType.COLLECTIBLE_ABEL (188)
function abel(tear: EntityTear) {
  // Delete Abel's vanilla tear (which deals 3.5 damage)
  if (
    tear.SpawnerType === EntityType.ENTITY_FAMILIAR &&
    tear.SpawnerVariant === FamiliarVariant.ABEL &&
    tear.CollisionDamage === 3.5
  ) {
    tear.Remove();
  }
}

// CollectibleType.COLLECTIBLE_TINY_PLANET (233)
function tinyPlanet(tear: EntityTear) {
  if (!g.p.HasCollectible(CollectibleType.COLLECTIBLE_TINY_PLANET)) {
    return;
  }

  // We modify the subtype of the tear to correspond to the direction that it came from
  if (tear.SubType === 0) {
    return;
  }

  // Orbiting tears
  const distance = 90;
  let positionMod = Vector(0, distance * -1); // The tear starts directly above the player
  const frameCount = tear.FrameCount;
  const direction = tear.SubType - 1; // We added 1 to the direction in the PostFireTear callback
  const degreesPerFrame = 8;
  let degrees = frameCount * degreesPerFrame;

  // Modify the degrees based on the direction that the tear was originally fired in
  // We don't check for a position of up because it starts above the player by default
  if (direction === Direction.RIGHT) {
    degrees += 90;
  } else if (direction === Direction.DOWN) {
    degrees += 180;
  } else if (direction === Direction.LEFT) {
    degrees += 270;
  }

  positionMod = positionMod.Rotated(degrees);
  tear.Position = g.p.Position.__add(positionMod);

  // We want the tear to be moving perpendicular to the line between the player and the tear
  tear.Velocity = Vector(distance / 4, 0);
  tear.Velocity = tear.Velocity.Rotated(degrees);

  // Keep it in the air for ( a while
  if (tear.FrameCount < 150) {
    tear.FallingSpeed = 0;
  }
}

// CollectibleType.COLLECTIBLE_EXPLOSIVO (401)
function explosivo(tear: EntityTear) {
  if (tear.Variant !== TearVariant.EXPLOSIVO) {
    return;
  }

  // StickTimer is 0 on the first frame after being fired in PostFireTear
  // It is 89 on the next frame in PostTearUpdate
  if (tear.StickTimer === 89) {
    tear.StickTimer = 29; // Reduce it by a factor of 3
  }
}

// CollectibleType.COLLECTIBLE_LIL_MONSTRO (471)
function lilMonstro(tear: EntityTear) {
  if (
    tear.FrameCount === 1 &&
    tear.SpawnerType === EntityType.ENTITY_FAMILIAR &&
    tear.SpawnerVariant === FamiliarVariant.LIL_MONSTRO
  ) {
    tear.CollisionDamage = g.p.Damage * FAMILIAR_TEAR_DAMAGE;
    tear.Velocity = tear.Velocity.__mul(2);
  }
}

// CollectibleTypeCustom.COLLECTIBLE_FIRE_MIND_IMPROVED (replacing 257)
function fireMindImproved(tear: EntityTear) {
  if (
    !g.p.HasCollectible(CollectibleTypeCustom.COLLECTIBLE_FIRE_MIND_IMPROVED) ||
    tear.SubType !== 1 ||
    tear.FrameCount % 2 !== 0
  ) {
    return;
  }

  // Fire trail tears
  const fire = Isaac.Spawn(
    EntityType.ENTITY_EFFECT,
    EffectVariant.HOT_BOMB_FIRE,
    0,
    tear.Position,
    g.zeroVector,
    null,
  );
  fire.SpriteScale = Vector(0.5, 0.5);

  // Fade the fire so that it is easier to see everything
  const color = fire.GetColor();
  const fadeAmount = 0.5;
  const newColor = Color(
    color.R,
    color.G,
    color.B,
    fadeAmount,
    color.RO,
    color.GO,
    color.BO,
  );
  fire.SetColor(newColor, 0, 0, true, true);
}
