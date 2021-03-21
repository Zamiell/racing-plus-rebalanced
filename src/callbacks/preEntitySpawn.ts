import g from "../globals";
import {
  CollectibleTypeCustom,
  PickupVariantCustom,
} from "../types/enums.custom";

export function main(
  entityType: int,
  variant: int,
  subType: int,
  position: Vector,
  velocity: Vector,
  spawner: Entity,
  initSeed: int,
): [int, int, int, int] | null {
  if (
    entityType === EntityType.ENTITY_PICKUP &&
    variant === PickupVariant.PICKUP_COLLECTIBLE
  ) {
    return collectible(subType, position, velocity, spawner, initSeed);
  }

  return null;
}

function collectible(
  subType: int,
  position: Vector,
  velocity: Vector,
  spawner: Entity,
  initSeed: int,
): [int, int, int, int] | null {
  let replacedSubType: int | undefined;
  switch (subType) {
    // 42
    case CollectibleType.COLLECTIBLE_BOBS_ROTTEN_HEAD: {
      // Replace Bob's Rotten Head (from Sloth) with Bob's Rotten Head (Improved)
      replacedSubType =
        CollectibleTypeCustom.COLLECTIBLE_BOBS_ROTTEN_HEAD_IMPROVED;
      break;
    }

    // 81
    case CollectibleType.COLLECTIBLE_DEAD_CAT: {
      // Replace Dead Cat (from Super Pride) with 1up!
      // (since Dead Cat is supposed to be removed from the game)
      replacedSubType = CollectibleType.COLLECTIBLE_ONE_UP;
      break;
    }

    // 129
    case CollectibleType.COLLECTIBLE_BUCKET_LARD: {
      // Replace Bucket of Lard (from Super Gluttony) with Super Bandage
      // (since Bucket of Lard is supposed to be removed from the game)
      replacedSubType = CollectibleType.COLLECTIBLE_SUPER_BANDAGE;
      break;
    }

    default: {
      break;
    }
  }

  if (replacedSubType !== undefined) {
    g.g.Spawn(
      EntityType.ENTITY_PICKUP,
      PickupVariant.PICKUP_COLLECTIBLE,
      position,
      velocity,
      spawner,
      replacedSubType,
      initSeed,
    );

    return [
      EntityType.ENTITY_PICKUP,
      PickupVariantCustom.INVISIBLE_PICKUP,
      0,
      0,
    ];
  }

  return null;
}
