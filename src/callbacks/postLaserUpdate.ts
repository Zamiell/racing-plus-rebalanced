import { EntityFlag, ModCallback } from "isaac-typescript-definitions";
import { FAMILIAR_TEAR_DAMAGE } from "../constants";
import g from "../globals";
import * as misc from "../misc";

export function init(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_LASER_UPDATE, main);
}

export function main(laser: EntityLaser): void {
  // Items
  lilBrimstone(laser); // 275
  isaacsHeart(laser); // 276
  mawOfTheVoid(laser); // 399
  technology25(laser); // Replacing 152

  // Miscellaneous
  familiarLaser(laser);
  friendlyFade(laser);
}

// CollectibleType.LIL_BRIMSTONE (275)
function lilBrimstone(laser: EntityLaser) {
  if (
    laser.FrameCount === 0 &&
    laser.SpawnerType === EntityType.FAMILIAR &&
    laser.SpawnerVariant === FamiliarVariant.LIL_BRIMSTONE
  ) {
    laser.CollisionDamage = 3 + g.p.Damage * FAMILIAR_TEAR_DAMAGE;
  }
}

// CollectibleType.ISAACS_HEART (276)
function isaacsHeart(laser: EntityLaser) {
  if (
    laser.FrameCount >= 3 ||
    laser.Variant !== LaserVariant.THICK_RED ||
    laser.SpawnerType !== EntityType.PLAYER ||
    !g.p.HasCollectible(CollectibleType.ISAACS_HEART)
  ) {
    return;
  }

  const hearts = Isaac.FindByType(
    EntityType.FAMILIAR,
    FamiliarVariant.ISAACS_HEART,
    -1,
    false,
    false,
  );
  if (hearts.length === 0) {
    return;
  }

  if (laser.FrameCount === 1) {
    laser.Parent = hearts[0];
  } else if (laser.FrameCount === 2) {
    laser.Visible = true;

    // Making the laser invisible earlier also muted the sound effect, so play it manually
    sfxManager.Play(SoundEffect.BLOOD_LASER_LARGE, 0.75, 0, false, 1); // 7
    // (a volume of 1 is a bit too loud)
  }
}

// CollectibleType.MAW_OF_VOID (399)
function mawOfTheVoid(laser: EntityLaser) {
  // The value will be somewhere around 0.05 because it is a float
  if (laser.BlackHpDropChance > 0.04 && laser.BlackHpDropChance < 0.06) {
    laser.CollisionDamage = g.p.Damage * 0.75; // Nerf the damage
    laser.SetBlackHpDropChance(0); // Remove the ability to drop black hearts
  }
}

// CollectibleTypeCustom.TECHNOLOGY_2_5 (replacing 152)
function technology25(laser: EntityLaser) {
  if (!g.p.HasCollectible(CollectibleTypeCustom.TECHNOLOGY_2_5)) {
    return;
  }

  const data = laser.GetData();
  if (data.ring !== true) {
    return;
  }

  // Keep the ring centered on the player
  laser.Position = g.p.Position;
}

function familiarLaser(laser: EntityLaser) {
  if (laser.FrameCount !== 0 || laser.SpawnerType !== EntityType.PLAYER) {
    return;
  }

  // Ignore lasers from Epic Fetus
  if (g.p.HasCollectible(CollectibleType.EPIC_FETUS)) {
    return;
  }

  // Ignore the special situation where we have Brimstone & Trisagion (the Trisagion lasers will
  // stay completely motionless and will not be removed with "entity.Remove()") In this case,
  // familiars won't be able to fire
  if (
    g.p.HasCollectible(CollectibleType.BRIMSTONE) &&
    g.p.HasCollectible(CollectibleType.TRISAGION)
  ) {
    return;
  }

  // Ignore Tech.5 lasers
  if (
    laser.Variant === LaserVariant.THIN_RED &&
    !g.p.HasCollectible(CollectibleType.TECHNOLOGY) && // 68
    !g.p.HasCollectible(CollectibleType.TECH_X) // 395
  ) {
    return;
  }

  // Ignore Technology Zero lasers
  if (
    laser.Variant === LaserVariant.THIN_RED &&
    laser.SubType === 4 // Technology Zero lasers seem to always have a subtype of 4
  ) {
    return;
  }

  // We only need to handle familiar shooting for Technology lasers, Brimstone lasers, and Tech X
  // lasers
  if (
    laser.Variant !== LaserVariant.THICK_RED && // 1
    laser.Variant !== LaserVariant.THIN_RED && // 2
    laser.Variant !== LaserVariant.BRIMTECH // 9
  ) {
    return;
  }

  let velocity = Vector(g.p.ShotSpeed * 10, 0).Rotated(laser.AngleDegrees);
  if (g.p.HasCollectible(CollectibleType.TECH_X)) {
    velocity = misc.getVelocityFromAimDirection();
  }
  const fakeTear = g.p.FireTear(g.p.Position, velocity, false, true, false);
  fakeTear.Remove();

  // Shoot some extra tears for Brimstone lasers
  if (
    (laser.Variant === LaserVariant.THICK_RED ||
      laser.Variant === LaserVariant.BRIMTECH) &&
    !g.p.HasCollectible(CollectibleType.TECH_X)
  ) {
    g.run.familiarMultiShot = 3; // For a total of 4
    if (g.p.HasCollectible(CollectibleType.ISAACS_HEART)) {
      g.run.familiarMultiShot = 0;
    }
    g.run.familiarMultiShotVelocity = velocity;
  }
}

function friendlyFade(laser: EntityLaser) {
  if (!laser.HasEntityFlags(EntityFlag.FRIENDLY)) {
    return;
  }

  // Fade the lasers of charmed enemies so that it is easier to see everything. We do this on every
  // frame since the `POST_LASER_INIT` callback is bugged.
  const color = laser.GetColor();
  const fadeAmount = 0.25;
  const newColor = Color(color.R, color.G, color.B, fadeAmount, 0, 0, 0);
  laser.SetColor(newColor, 0, 0, true, true);
}
