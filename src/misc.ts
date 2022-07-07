import {
  CollectibleType,
  EffectVariant,
  EntityType,
  GridEntityType,
} from "isaac-typescript-definitions";
import { getEntities, setPlayerHealth } from "isaacscript-common";
import g from "./globals";

export function getRandomOffsetPosition(
  position: Vector,
  offsetSize: int,
  seed: int,
): Vector {
  math.randomseed(seed);
  const offsetDirection = math.random(1, 4);

  let offsetX: int;
  let offsetY: int;
  if (offsetDirection === 1) {
    // Bottom right
    offsetX = offsetSize;
    offsetY = offsetSize;
  } else if (offsetDirection === 2) {
    // Top right
    offsetX = offsetSize;
    offsetY = offsetSize * -1;
  } else if (offsetDirection === 3) {
    // Bottom left
    offsetX = offsetSize * -1;
    offsetY = offsetSize;
  } else if (offsetDirection === 4) {
    // Top left
    offsetX = offsetSize * -1;
    offsetY = offsetSize * -1;
  } else {
    error("Unknown offset direction.");
  }

  return Vector(position.X + offsetX, position.Y + offsetY);
}

export function getVelocityFromAimDirection(): Vector {
  const velocity = g.p.GetAimDirection();
  return velocity.mul(g.p.ShotSpeed * 10);
}

export function hasNoHealth(): boolean {
  return (
    g.p.GetHearts() === 0 &&
    g.p.GetSoulHearts() === 0 &&
    g.p.GetBoneHearts() === 0
  );
}

export function isOnTearBuild(): boolean {
  return (
    !g.p.HasCollectible(CollectibleType.DR_FETUS) && // 52
    !g.p.HasCollectible(CollectibleType.TECHNOLOGY) && // 68
    !g.p.HasCollectible(CollectibleType.MOMS_KNIFE) && // 114
    !g.p.HasCollectible(CollectibleType.BRIMSTONE) && // 118
    !g.p.HasCollectible(CollectibleType.EPIC_FETUS) && // 168
    !g.p.HasCollectible(CollectibleType.TECH_X) // 395
  );
}

export function killIfNoHealth(): void {
  if (hasNoHealth()) {
    g.p.Kill();
  }
}

export function removeAllEntities(): void {
  for (const entity of getEntities()) {
    if (
      entity.ToNPC() !== undefined ||
      entity.Type === EntityType.PICKUP || // 5
      entity.Type === EntityType.SLOT || // 6
      (entity.Type === EntityType.EFFECT && // 1000
        entity.Variant === (EffectVariant.DEVIL as int)) || // 6
      (entity.Type === EntityType.EFFECT && // 1000
        entity.Variant === (EffectVariant.DICE_FLOOR as int)) // 76
    ) {
      entity.Remove();
    }
  }

  // We need to also set the room to being clear, otherwise we will get a free drop/charge if there
  // was an enemy in the room.
  g.r.SetClear(true);
}

export function removeAllGridEntities(): void {
  const gridSize = g.r.GetGridSize();
  for (let i = 1; i <= gridSize; i++) {
    const gridEntity = g.r.GetGridEntity(i);
    if (gridEntity !== undefined) {
      if (
        gridEntity.GetSaveState().Type !== GridEntityType.WALL && // 15
        gridEntity.GetSaveState().Type !== GridEntityType.DOOR // 16
      ) {
        g.r.RemoveGridEntity(i, 0, false); // gridEntity.Destroy() does not work
      }
    }
  }
}

export function removeSpecificEntities(
  entityType: EntityType,
  variant: int,
): void {
  const entities = Isaac.FindByType(entityType, variant, -1, false, false);
  for (const entity of entities) {
    entity.Remove();
  }
}

export function setHealthFromLastFrame(): void {
  // If this is the first frame of the game, then there is no last frame to revert the health to.
  const gameFrameCount = g.g.GetFrameCount();
  if (gameFrameCount === 0) {
    return;
  }

  // If we already restored the health from the last frame on this frame, then don't do it a second
  // time.
  if (g.run.health.restoredLastHealthOnThisFrame) {
    return;
  }
  g.run.health.restoredLastHealthOnThisFrame = true;

  setPlayerHealth(
    g.run.lastHealth.hearts,
    g.run.lastHealth.maxHearts,
    g.run.lastHealth.soulHearts,
    g.run.lastHealth.blackHearts,
    g.run.lastHealth.boneHearts,
  );
}
