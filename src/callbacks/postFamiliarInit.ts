import { CollectibleType } from "isaac-typescript-definitions";
import { ZERO_VECTOR } from "../constants";
import g from "../globals";

// FamiliarVariant.LITTLE_CHUBBY (3)
export function littleChubby(familiar: EntityFamiliar): void {
  let damage = 3.5 + g.p.Damage * 0.25;
  if (g.p.HasCollectible(CollectibleType.BFFS)) {
    damage *= 2;
  }
  familiar.CollisionDamage = damage;
}

// FamiliarVariant.DEAD_BIRD (14)
export function deadBird(familiar: EntityFamiliar): void {
  if (g.run.spawningDeadBird) {
    return;
  }

  let damage = 2 + g.p.Damage * 0.25;
  if (g.p.HasCollectible(CollectibleType.BFFS)) {
    damage *= 2;
  }

  familiar.CollisionDamage = damage;
  for (let i = 0; i < 4; i++) {
    // We will have 5 birds in total since 1 is spawned by the vanilla item.
    g.run.spawningDeadBird = true;
    const bird = g.g.Spawn(
      familiar.Type,
      familiar.Variant,
      g.p.Position,
      ZERO_VECTOR,
      g.p,
      familiar.SubType,
      familiar.InitSeed,
    );
    // (familiar.Position is not initialized yet)
    bird.CollisionDamage = damage;
    g.run.spawningDeadBird = true;
  }
}

// FamiliarVariant.DADDY_LONGLEGS (16)
export function daddyLonglegs(familiar: EntityFamiliar): void {
  let damage = 20 + g.p.Damage * 3;
  if (g.p.HasCollectible(CollectibleType.BFFS)) {
    damage *= 2;
  }
  familiar.CollisionDamage = damage;
}

// FamiliarVariant.SACRIFICIAL_DAGGER (35)
export function sacrificialDagger(familiar: EntityFamiliar): void {
  let damage = 8.25;
  if (g.p.HasCollectible(CollectibleType.BFFS)) {
    damage *= 2;
  }
  familiar.CollisionDamage = damage;
}

// FamiliarVariant.LEECH (56)
export function leech(familiar: EntityFamiliar): void {
  let damage = 1.5 + g.p.Damage * 0.25;
  if (g.p.HasCollectible(CollectibleType.BFFS)) {
    damage *= 2;
  }
  familiar.CollisionDamage = damage;
}

// FamiliarVariant.LIL_HAUNT (63)
export function lilHaunt(familiar: EntityFamiliar): void {
  let damage = 2 + g.p.Damage * 0.25;
  if (g.p.HasCollectible(CollectibleType.BFFS)) {
    damage *= 2;
  }
  familiar.CollisionDamage = damage;
}

// FamiliarVariant.BLUEBABYS_ONLY_FRIEND (77)
export function blueBabysOnlyFriend(familiar: EntityFamiliar): void {
  let damage = 2.5 + g.p.Damage * 0.25;
  if (g.p.HasCollectible(CollectibleType.BFFS)) {
    damage *= 2;
  }
  familiar.CollisionDamage = damage;
}

// FamiliarVariant.GEMINI (79)
export function gemini(familiar: EntityFamiliar): void {
  let damage = 3 + g.p.Damage;
  if (g.p.HasCollectible(CollectibleType.BFFS)) {
    damage *= 2;
  }
  familiar.CollisionDamage = damage;
}

// FamiliarVariant.LIL_GURDY (87)
export function lilGurdy(familiar: EntityFamiliar): void {
  let damage = 6 + g.p.Damage * 0.25;
  if (g.p.HasCollectible(CollectibleType.BFFS)) {
    damage *= 2;
  }
  familiar.CollisionDamage = damage;
}

// FamiliarVariant.BUMBO (88)
export function bumbo(familiar: EntityFamiliar): void {
  // Make Bumbo start at level 3 Bumbo reaches level 4 (max level) at 25 coins
  familiar.Coins = 25;
}

// FamiliarVariant.BIG_CHUBBY (104)
export function bigChubby(familiar: EntityFamiliar): void {
  let damage = 2.7 + g.p.Damage * 0.25;
  if (g.p.HasCollectible(CollectibleType.BFFS)) {
    damage *= 2;
  }
  familiar.CollisionDamage = damage;
}

export function disableVanillaShooting(familiar: EntityFamiliar): void {
  familiar.FireCooldown = 1000000;
}

export function damage7(familiar: EntityFamiliar): void {
  let damage = 7;
  if (g.p.HasCollectible(CollectibleType.BFFS)) {
    damage *= 2;
  }
  familiar.CollisionDamage = damage;
}
