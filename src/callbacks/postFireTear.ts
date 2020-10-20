import { FAMILIAR_TEAR_DAMAGE, FAMILIAR_TEAR_SCALE } from "../constants";
import g from "../globals";
import * as pills from "../pills";
import { CollectibleTypeCustom } from "../types/enums.custom";

export function main(tear: EntityTear): void {
  if (
    !g.run.abelDoubleTear // 188
    && !g.run.wizDoubleTear // 358
    && !g.run.strabismusDoubleTear
  ) {
    g.run.tearCounter += 1;
  }

  // Items
  momsContacts(tear); // 110
  abel(tear); // 188
  tinyPlanet(tear); // 233
  twentyTwenty(tear); // 245
  isaacsHeart(tear); // 276
  theWiz(tear); // 358
  fireMind(tear); // Replacing 257
  strabismus(tear);
  u235(tear);

  // Pills
  pillAether(tear);
  pillWallsHaveEyes(tear);

  // Miscellaneous
  removeFear(tear);
  familiars(tear);
}

// CollectibleType.COLLECTIBLE_MOMS_CONTACTS (110)
function momsContacts(tear: EntityTear) {
  if (!g.p.HasCollectible(CollectibleType.COLLECTIBLE_MOMS_CONTACTS)) {
    return;
  }

  tear.TearFlags |= TearFlags.TEAR_FREEZE;
}

// CollectibleType.COLLECTIBLE_ABEL (188)
function abel(tear: EntityTear) {
  if (
    !g.p.HasCollectible(CollectibleType.COLLECTIBLE_ABEL)
    || g.run.abelDoubleTear
  ) {
    return;
  }

  const abels = Isaac.FindByType(
    EntityType.ENTITY_FAMILIAR,
    FamiliarVariant.ABEL,
    -1,
    false,
    false,
  );
  for (const abelEntity of abels) {
    g.run.abelDoubleTear = true;
    const velocity = tear.Velocity.__mul(-1);
    g.p.FireTear(abelEntity.Position, velocity, false, true, false);
    g.run.abelDoubleTear = false;
  }
}

// CollectibleType.COLLECTIBLE_TINY_PLANET (233)
function tinyPlanet(tear: EntityTear) {
  // Local variables
  const direction = g.p.GetFireDirection();

  if (!g.p.HasCollectible(CollectibleType.COLLECTIBLE_TINY_PLANET)) {
    return;
  }

  // We need to have spectral for this ability to work properly
  tear.TearFlags |= TearFlags.TEAR_SPECTRAL;

  // We want the tears to orbit for a long time without falling to the ground
  tear.FallingSpeed = 0;

  // Mark the direction of the tear on the subtype
  // All vanilla tears have a subtype of 0,
  // so any non-zero value will denote that this is a Tiny Planet tear
  // We add 1 because a direction of left is enum 0 and we need the subtype to be non-zero
  tear.SubType = direction + 1;

  // Set the tear's starting position
  // (this is necessary because otherwise you will see it in the default location for a frame)
  const distance = 90;
  let degrees = 0;
  if (direction === Direction.RIGHT) {
    degrees += 90;
  } else if (direction === Direction.DOWN) {
    degrees += 180;
  } else if (direction === Direction.LEFT) {
    degrees += 270;
  }
  tear.Position = g.p.Position.__add(Vector(0, distance * -1)).Rotated(degrees);

  // From this point, the tear's position && velocity will be handled in the PostTearUpdate
  // callback
}

// CollectibleType.COLLECTIBLE_20_20 (245)
function twentyTwenty(tear: EntityTear) {
  if (!g.p.HasCollectible(CollectibleType.COLLECTIBLE_20_20)) {
    return;
  }

  if (g.run.tearCounter % 8 === 0) {
    tear.Remove();
  }
}

// CollectibleType.COLLECTIBLE_ISAACS_HEART (276)
function isaacsHeart(tear: EntityTear) {
  if (!g.p.HasCollectible(CollectibleType.COLLECTIBLE_ISAACS_HEART)) {
    return;
  }

  g.run.spawningLaser = true;
  g.p.FireBrimstone(tear.Velocity);
  g.run.spawningLaser = false;
  tear.Remove();
}

// CollectibleType.COLLECTIBLE_THE_WIZ (358)
function theWiz(tear: EntityTear) {
  if (
    !g.p.HasCollectible(CollectibleType.COLLECTIBLE_THE_WIZ)
    || g.run.wizDoubleTear
  ) {
    return;
  }

  g.run.wizDoubleTear = true;
  g.p.FireTear(g.p.Position, tear.Velocity.__mul(-1), false, false, false);
  g.run.wizDoubleTear = false;
}

// CollectibleTypeCustom.COLLECTIBLE_FIRE_MIND_IMPROVED (replacing 257)
function fireMind(tear: EntityTear) {
  if (
    !g.p.HasCollectible(CollectibleTypeCustom.COLLECTIBLE_FIRE_MIND_IMPROVED)
  ) {
    return;
  }

  // Mark that we shot this tear
  tear.SubType = 1;
}

// CollectibleTypeCustom.COLLECTIBLE_STRABISMUS
function strabismus(tear: EntityTear) {
  if (
    !g.p.HasCollectible(CollectibleTypeCustom.COLLECTIBLE_STRABISMUS)
    || g.run.strabismusDoubleTear
  ) {
    return;
  }

  // Spawn a new tear with a random velocity
  const seed = tear.GetDropRNG().GetSeed();
  math.randomseed(seed);
  const rotation = math.random(1, 359);
  const velocity = tear.Velocity.Rotated(rotation);
  g.run.strabismusDoubleTear = true;
  g.p.FireTear(g.p.Position, velocity, false, true, false);
  g.run.strabismusDoubleTear = false;
}

// CollectibleTypeCustom.COLLECTIBLE_U235
function u235(tear: EntityTear) {
  if (!g.p.HasCollectible(CollectibleTypeCustom.COLLECTIBLE_U235)) {
    return;
  }

  // Every 8th tear is a bomb
  if (g.run.tearCounter % 8 === 0) {
    const bomb = g.g
      .Spawn(
        EntityType.ENTITY_BOMBDROP, // 4
        0,
        tear.Position,
        tear.Velocity,
        tear.SpawnerEntity,
        0,
        tear.InitSeed,
      )
      .ToBomb();
    bomb.ExplosionDamage = g.p.Damage * 5 + 30; // Same formula as Dr. Fetus

    tear.Remove();
  }
}

function pillAether(tear: EntityTear) {
  if (g.run.pills.aether === 0) {
    return;
  }

  // Shoot 8 tears at a time
  g.run.pills.aetherAngle += 45;
  if (g.run.pills.aetherAngle < 360) {
    const vel = tear.Velocity.Rotated(g.run.pills.aetherAngle);
    g.p.FireTear(g.p.Position, vel, false, false, false);
  } else {
    g.run.pills.aetherAngle = 0;
  }
}

function pillWallsHaveEyes(tear: EntityTear) {
  if (g.run.pills.wallsHaveEyes === 0 || g.run.pills.wallsHaveEyesShooting) {
    return;
  }
  g.run.pills.wallsHaveEyesShooting = true;

  // Local variables
  const direction = g.p.GetFireDirection();
  const roomShape = g.r.GetRoomShape();

  let amountToAdd = 1;
  if (direction === Direction.LEFT || direction === Direction.RIGHT) {
    amountToAdd = 15;
    if (roomShape >= RoomShape.ROOMSHAPE_2x1) {
      amountToAdd = 28;
    }
  }

  // Make a list of the walls to shoot from
  const roomShapeCoordinates = pills.WALL_COORDINATES.get(roomShape);
  if (roomShapeCoordinates === undefined) {
    throw new Error(
      `Failed to get the wall coordinates for room shape: ${roomShape}`,
    );
  }
  const coordinates = roomShapeCoordinates.get(direction);
  if (coordinates === undefined) {
    throw new Error(
      `Failed to get the wall coordinates direction: ${direction}`,
    );
  }
  const [
    startingGridCoordinate,
    numTimesToIterate,
    startingGridCoordinateForSecondWall,
  ] = coordinates;
  const walls: Array<int> = [];
  for (let i = 0; i < numTimesToIterate; i++) {
    const coordinate = startingGridCoordinate + i * amountToAdd;
    walls.push(coordinate);
  }
  if (startingGridCoordinateForSecondWall !== undefined) {
    // Only for L rooms
    for (let i = 0; i < numTimesToIterate; i++) {
      const coordinate = startingGridCoordinateForSecondWall + i * amountToAdd;
      walls.push(coordinate);
    }
  }

  for (const wall of walls) {
    const gridEntity = g.r.GetGridEntity(wall);
    if (gridEntity !== null) {
      const saveState = gridEntity.GetSaveState();
      if (saveState.Type === GridEntityType.GRID_WALL) {
        // By default, the tear will get hit by the collision of the wall,
        // so we need to move it closer to the center of the room
        let adjustedPosition = gridEntity.Position;
        const distanceToAdjust = 15;
        if (direction === Direction.LEFT) {
          adjustedPosition = adjustedPosition.__add(
            Vector(distanceToAdjust * -1, 0),
          );
        } else if (direction === Direction.UP) {
          adjustedPosition = adjustedPosition.__add(
            Vector(0, distanceToAdjust * -1),
          );
        } else if (direction === Direction.RIGHT) {
          adjustedPosition = adjustedPosition.__add(
            Vector(distanceToAdjust, 0),
          );
        } else if (direction === Direction.DOWN) {
          adjustedPosition = adjustedPosition.__add(
            Vector(0, distanceToAdjust),
          );
        }

        g.p.FireTear(adjustedPosition, tear.Velocity, false, true, false);
      }
    }
  }

  g.run.pills.wallsHaveEyesShooting = false;
}

function removeFear(tear: EntityTear) {
  tear.TearFlags &= ~TearFlags.TEAR_FEAR;
}

function familiars(tear: EntityTear) {
  // Local variables
  const direction = g.p.GetFireDirection();

  let damage = 3.5 + g.p.Damage * FAMILIAR_TEAR_DAMAGE;
  if (g.p.HasCollectible(CollectibleType.COLLECTIBLE_BFFS)) {
    damage *= 2;
  }

  // If the player has Tiny Planet, the velocity of the familiar's tears will be messed up
  // Manually detect the direction && fix this
  let velocity = tear.Velocity;
  if (g.p.HasCollectible(CollectibleType.COLLECTIBLE_TINY_PLANET)) {
    if (direction === Direction.LEFT) {
      velocity = Vector(-1, 0);
    } else if (direction === Direction.UP) {
      velocity = Vector(0, -1);
    } else if (direction === Direction.RIGHT) {
      velocity = Vector(1, 0);
    } else if (direction === Direction.DOWN) {
      velocity = Vector(0, 1);
    }
    velocity = velocity.__mul(g.p.ShotSpeed * 10);
  }

  const familiarEntities = Isaac.FindByType(
    EntityType.ENTITY_FAMILIAR,
    -1,
    -1,
    false,
    false,
  );
  for (const familiar of familiarEntities) {
    if (
      familiar.Variant === FamiliarVariant.BROTHER_BOBBY // 1
      || familiar.Variant === FamiliarVariant.DEMON_BABY // 2
      || familiar.Variant === FamiliarVariant.LITTLE_GISH // 4
      || familiar.Variant === FamiliarVariant.LITTLE_STEVEN // 5
      || familiar.Variant === FamiliarVariant.SISTER_MAGGY // 7
      || familiar.Variant === FamiliarVariant.GHOST_BABY // 9
      || familiar.Variant === FamiliarVariant.RAINBOW_BABY // 11
      || familiar.Variant === FamiliarVariant.ISAACS_HEAD // 12
      || familiar.Variant === FamiliarVariant.MONGO_BABY // 74
      || familiar.Variant === FamiliarVariant.SERAPHIM // 92
    ) {
      const familiarTear = Isaac.Spawn(
        EntityType.ENTITY_TEAR,
        0,
        0,
        familiar.Position,
        velocity,
        null,
      ).ToTear();
      familiarTear.Scale = tear.Scale * FAMILIAR_TEAR_SCALE;
      familiarTear.CollisionDamage = damage;

      if (familiar.Variant === FamiliarVariant.LITTLE_GISH) {
        // 4
        const color = Color(0, 0, 0, 1, 1, 1, 1); // Black
        familiarTear.SetColor(color, 10000, 1000, false, false);
        familiarTear.TearFlags |= TearFlags.TEAR_SLOW;
      } else if (familiar.Variant === FamiliarVariant.LITTLE_STEVEN) {
        // 5
        const color = Color(1, 0, 1, 1, 1, 1, 1); // Purple
        familiarTear.SetColor(color, 10000, 1000, false, false);
        familiarTear.TearFlags |= TearFlags.TEAR_HOMING;
      } else if (familiar.Variant === FamiliarVariant.GHOST_BABY) {
        // 9
        const color = Color(1, 1, 1, 0.5, 1, 1, 1); // Faded
        familiarTear.SetColor(color, 10000, 1000, false, false);
        familiarTear.TearFlags |= TearFlags.TEAR_SPECTRAL;
      } else if (familiar.Variant === FamiliarVariant.RAINBOW_BABY) {
        // 11
        const color = Color(2, 0, 2, 1, 1, 1, 1); // Pink
        familiarTear.SetColor(color, 10000, 1000, false, false);
        math.randomseed(g.g.GetFrameCount());
        const tearFlag = math.random(1, 60);
        familiarTear.TearFlags |= 1 << tearFlag;
      } else if (familiar.Variant === FamiliarVariant.MONGO_BABY) {
        // 74
        // Shoot a second tear a few frames from now
        g.run.room.mongoBabyTears.push({
          frame: g.g.GetFrameCount() + 3,
          familiar: EntityRef(familiar),
          velocity,
          damage,
          scale: tear.Scale * FAMILIAR_TEAR_SCALE,
        });
      } else if (familiar.Variant === FamiliarVariant.SERAPHIM) {
        // 92
        // Sacred Heart gives a 89.53% damage up, so emulate this
        familiarTear.CollisionDamage = damage * 1.8953;
        const color = Color(1, 1, 1, 1, 1, 1, 1); // White
        familiarTear.SetColor(color, 10000, 1000, false, false);
        familiarTear.TearFlags |= TearFlags.TEAR_HOMING; // 1 << 2
      }
    } else if (familiar.Variant === FamiliarVariant.ROBO_BABY) {
      // 6
      const laser = g.p.FireTechLaser(
        familiar.Position,
        0,
        velocity,
        false,
        false,
      );
      laser.CollisionDamage = damage;
    } else if (familiar.Variant === FamiliarVariant.HARLEQUIN_BABY) {
      // 10
      for (let i = 0; i < 2; i++) {
        if (i === 1) {
          velocity = velocity.Rotated(-10);
        } else if (i === 2) {
          velocity = velocity.Rotated(10);
        }
        const familiarTear = Isaac.Spawn(
          EntityType.ENTITY_TEAR,
          0,
          0,
          familiar.Position,
          velocity,
          null,
        ).ToTear();
        familiarTear.Scale = tear.Scale * FAMILIAR_TEAR_SCALE;
        familiarTear.CollisionDamage = damage;
      }
    } else if (familiar.Variant === FamiliarVariant.LIL_LOKI) {
      // 97
      for (let i = 0; i < 4; i++) {
        const familiarTear = Isaac.Spawn(
          EntityType.ENTITY_TEAR,
          0,
          0,
          familiar.Position,
          velocity,
          null,
        ).ToTear();
        velocity = velocity.Rotated(90);
        familiarTear.Scale = tear.Scale * FAMILIAR_TEAR_SCALE;
        familiarTear.CollisionDamage = damage;
      }
    }
  }
}
