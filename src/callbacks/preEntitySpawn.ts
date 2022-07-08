import {
  CollectibleType,
  EntityType,
  PickupVariant,
} from "isaac-typescript-definitions";
import { spawnCollectible } from "isaacscript-common";
import { CollectibleTypeCustom } from "../enums/CollectibleTypeCustom";
import { PickupVariantCustom } from "../enums/PickupVariantCustom";

export function main(
  entityType: EntityType,
  variant: int,
  subType: int,
  position: Vector,
  velocity: Vector,
  spawner: Entity | undefined,
  initSeed: Seed,
): [EntityType, int, int, int] | undefined {
  if (
    entityType === EntityType.PICKUP &&
    variant === (PickupVariant.COLLECTIBLE as int)
  ) {
    return collectible(
      subType as CollectibleType,
      position,
      velocity,
      spawner,
      initSeed,
    );
  }

  return undefined;
}

function collectible(
  subType: CollectibleType,
  position: Vector,
  _velocity: Vector,
  _spawner: Entity | undefined,
  initSeed: Seed,
): [EntityType, int, int, int] | undefined {
  let replacedSubType: CollectibleType | undefined;

  switch (subType) {
    // 42
    case CollectibleType.BOBS_ROTTEN_HEAD: {
      // Replace Bob's Rotten Head (from Sloth) with Bob's Rotten Head (Improved).
      replacedSubType = CollectibleTypeCustom.BOBS_ROTTEN_HEAD_IMPROVED;
      break;
    }

    // 81
    case CollectibleType.DEAD_CAT: {
      // Replace Dead Cat (from Super Pride) with 1up (since Dead Cat is supposed to be removed from
      // the game).
      replacedSubType = CollectibleType.ONE_UP;
      break;
    }

    // 129
    case CollectibleType.BUCKET_OF_LARD: {
      // Replace Bucket of Lard (from Super Gluttony) with Super Bandage (since Bucket of Lard is
      // supposed to be removed from the game).
      replacedSubType = CollectibleType.SUPER_BANDAGE;
      break;
    }

    default: {
      break;
    }
  }

  if (replacedSubType !== undefined) {
    spawnCollectible(replacedSubType, position, initSeed);

    return [EntityType.PICKUP, PickupVariantCustom.INVISIBLE_PICKUP, 0, 0];
  }

  return undefined;
}
