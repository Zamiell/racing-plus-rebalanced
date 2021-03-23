import g from "./globals";
import { CollectibleTypeCustom } from "./types/enums";

export function getItemMaxCharges(collectibleType: CollectibleType): int {
  if (collectibleType === 0) {
    return 0;
  }

  return g.itemConfig.GetCollectible(collectibleType).MaxCharges;
}

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

export function getRoomIndex(): int {
  const roomIndex = g.l.GetCurrentRoomDesc().SafeGridIndex;
  if (roomIndex < 0) {
    // SafeGridIndex is always -1 for rooms outside the grid
    return g.l.GetCurrentRoomIndex();
  }
  return roomIndex;
}

// This function is from Kilburn
export function getNumTotalCollectibles(): int {
  let id = CollectibleType.NUM_COLLECTIBLES - 1; // Start at the last vanilla ID
  let step = 16;
  while (step > 0) {
    if (g.itemConfig.GetCollectible(id + step)) {
      id += step;
    } else {
      step = math.floor(step / 2);
    }
  }

  return id;
}

export function getVelocityFromAimDirection(): Vector {
  const velocity = g.p.GetAimDirection();
  return velocity.__mul(g.p.ShotSpeed * 10);
}

export function gridToPos(origX: int, origY: int): Vector {
  const x = origX + 1;
  const y = origY + 1;
  return g.r.GetGridPosition(y * g.r.GetGridWidth() + x);
}

export function hasFlag(flags: int, flag: int): boolean {
  return (flags & flag) !== 0;
}

export function hasNoHealth(): boolean {
  return (
    g.p.GetHearts() === 0 &&
    g.p.GetSoulHearts() === 0 &&
    g.p.GetBoneHearts() === 0
  );
}

export function incrementRNG(seed: int): int {
  // The game expects seeds in the range of 0 to 4294967295
  const rng = RNG();
  rng.SetSeed(seed, 35);
  // This is the ShiftIdx that blcd recommended after having reviewing the game's internal functions
  rng.Next();
  const newSeed = rng.GetSeed();
  return newSeed;
}

export function isOnTearBuild(): boolean {
  return (
    !g.p.HasCollectible(CollectibleType.COLLECTIBLE_DR_FETUS) && // 52
    !g.p.HasCollectible(CollectibleType.COLLECTIBLE_TECHNOLOGY) && // 68
    !g.p.HasCollectible(CollectibleType.COLLECTIBLE_MOMS_KNIFE) && // 114
    !g.p.HasCollectible(CollectibleType.COLLECTIBLE_BRIMSTONE) && // 118
    !g.p.HasCollectible(CollectibleType.COLLECTIBLE_EPIC_FETUS) && // 168
    !g.p.HasCollectible(CollectibleType.COLLECTIBLE_TECH_X) // 395
  );
}

export function killIfNoHealth(): void {
  if (hasNoHealth()) {
    g.p.Kill();
  }
}

export function openAllDoors(): void {
  for (let i = 0; i <= 7; i++) {
    const door = g.r.GetDoor(i);
    if (door !== null) {
      // If we try to open a hidden secret room door (or super secret room door),
      // then nothing will happen
      door.Open();
    }
  }
}

export function removeAllEntities(): void {
  for (const entity of Isaac.GetRoomEntities()) {
    if (
      entity.ToNPC() !== null ||
      entity.Type === EntityType.ENTITY_PICKUP || // 5
      entity.Type === EntityType.ENTITY_SLOT || // 6
      (entity.Type === EntityType.ENTITY_EFFECT && // 1000
        entity.Variant === EffectVariant.DEVIL) || // 6
      (entity.Type === EntityType.ENTITY_EFFECT && // 1000
        entity.Variant === EffectVariant.DICE_FLOOR) // 76
    ) {
      entity.Remove();
    }
  }

  // We need to also set the room to being clear,
  // otherwise we will get a free drop/charge if there was an enemy in the room
  g.r.SetClear(true);
}

export function removeAllGridEntities(): void {
  const gridSize = g.r.GetGridSize();
  for (let i = 1; i <= gridSize; i++) {
    const gridEntity = g.r.GetGridEntity(i);
    if (gridEntity !== null) {
      if (
        gridEntity.GetSaveState().Type !== GridEntityType.GRID_WALL && // 15
        gridEntity.GetSaveState().Type !== GridEntityType.GRID_DOOR // 16
      ) {
        g.r.RemoveGridEntity(i, 0, false); // gridEntity.Destroy() does not work
      }
    }
  }
}

export function removeItemFromItemTracker(
  collectibleType: CollectibleType | CollectibleTypeCustom,
): void {
  const itemConfig = g.itemConfig.GetCollectible(collectibleType);
  Isaac.DebugString(
    `Removing collectible ${collectibleType} (${itemConfig.Name})`,
  );
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

function setHealth(
  hearts: int,
  maxHearts: int,
  soulHearts: int,
  blackHearts: int,
  boneHearts: int,
) {
  g.p.AddMaxHearts(-24, true); // Remove all hearts
  g.p.AddSoulHearts(-24);
  g.p.AddBoneHearts(-24);
  g.p.AddMaxHearts(maxHearts, true);
  g.p.AddBoneHearts(boneHearts);
  g.p.AddHearts(hearts);
  for (let i = 0; i < soulHearts; i++) {
    const bitPosition = math.floor(i / 2);
    const bit = (blackHearts & (1 << bitPosition)) >>> bitPosition;
    if (bit === 0) {
      // Soul heart
      g.p.AddSoulHearts(1);
    } else {
      // Black heart
      g.p.AddBlackHearts(1);
    }
  }
}

export function setHealthFromLastFrame(): void {
  // If this is the first frame of the game, then there is no last frame to revert the health to
  const gameFrameCount = g.g.GetFrameCount();
  if (gameFrameCount === 0) {
    return;
  }

  // If we already restored the health from the last frame on this frame,
  // then don't do it a second time
  if (g.run.health.restoredLastHealthOnThisFrame) {
    return;
  }
  g.run.health.restoredLastHealthOnThisFrame = true;

  setHealth(
    g.run.lastHealth.hearts,
    g.run.lastHealth.maxHearts,
    g.run.lastHealth.soulHearts,
    g.run.lastHealth.blackHearts,
    g.run.lastHealth.boneHearts,
  );
}
