import {
  BombVariant,
  CollectibleType,
  Direction,
  EntityType,
  FamiliarVariant,
  GridEntityType,
  LaserOffset,
  ModCallback,
  RoomShape,
  TearFlag,
  TearVariant,
} from "isaac-typescript-definitions";
import {
  addFlag,
  getRandomEnumValue,
  removeFlag,
  spawnBombWithSeed,
  spawnTear,
} from "isaacscript-common";
import { FAMILIAR_TEAR_DAMAGE, FAMILIAR_TEAR_SCALE } from "../constants";
import { CollectibleTypeCustom } from "../enums/CollectibleTypeCustom";
import g from "../globals";
import * as misc from "../misc";
import * as pills from "../pills";

const FADED_COLOR = Color(1, 1, 1, 0.5, 1, 1, 1);
const PINK_COLOR = Color(2, 0, 2, 1, 1, 1, 1);
const BLACK_COLOR = Color(0, 0, 0, 1, 1, 1, 1);
const WHITE_COLOR = Color(1, 1, 1, 1, 1, 1, 1);
const PURPLE_COLOR = Color(1, 0, 1, 1, 1, 1, 1);

export function init(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_FIRE_TEAR, main);
}

function main(tear: EntityTear) {
  if (
    !g.run.abelDoubleTear && // 188
    !g.run.wizDoubleTear && // 358
    !g.run.strabismusDoubleTear
  ) {
    g.run.tearCounter += 1;
  }

  // Items
  momsContacts(tear); // 110
  abel(tear); // 188
  tinyPlanet(tear); // 233
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

// CollectibleType.MOMS_CONTACTS (110)
function momsContacts(tear: EntityTear) {
  if (!g.p.HasCollectible(CollectibleType.MOMS_CONTACTS)) {
    return;
  }

  tear.TearFlags = addFlag(tear.TearFlags, TearFlag.FREEZE);
}

// CollectibleType.ABEL (188)
function abel(tear: EntityTear) {
  if (!g.p.HasCollectible(CollectibleType.ABEL) || g.run.abelDoubleTear) {
    return;
  }

  const abels = Isaac.FindByType(
    EntityType.FAMILIAR,
    FamiliarVariant.ABEL,
    -1,
    false,
    false,
  );
  for (const abelEntity of abels) {
    g.run.abelDoubleTear = true;
    const velocity = tear.Velocity.mul(-1);
    g.p.FireTear(abelEntity.Position, velocity, false, true, false);
    g.run.abelDoubleTear = false;
  }
}

// CollectibleType.TINY_PLANET (233)
function tinyPlanet(tear: EntityTear) {
  const direction = g.p.GetFireDirection();

  if (!g.p.HasCollectible(CollectibleType.TINY_PLANET)) {
    return;
  }

  // We need to have spectral for this ability to work properly.
  tear.TearFlags = addFlag(tear.TearFlags, TearFlag.SPECTRAL);

  // We want the tears to orbit for a long time without falling to the ground.
  tear.FallingSpeed = 0;

  // Mark the direction of the tear on the subtype. All vanilla tears have a subtype of 0, so any
  // non-zero value will denote that this is a Tiny Planet tear. We add 1 because a direction of
  // left is enum 0 and we need the subtype to be non-zero.
  tear.SubType = (direction as int) + 1;

  // Set the tear's starting position. (This is necessary because otherwise you will see it in the
  // default location for a frame.)
  const distance = 90;
  let degrees = 0;
  if (direction === Direction.RIGHT) {
    degrees += 90;
  } else if (direction === Direction.DOWN) {
    degrees += 180;
  } else if (direction === Direction.LEFT) {
    degrees += 270;
  }
  tear.Position = g.p.Position.add(Vector(0, distance * -1)).Rotated(degrees);

  // From this point, the tear's position and velocity will be handled in the `POST_TEAR_UPDATE`
  // callback.
}

// CollectibleType.ISAACS_HEART (276)
function isaacsHeart(tear: EntityTear) {
  if (!g.p.HasCollectible(CollectibleType.ISAACS_HEART)) {
    return;
  }

  g.run.spawningIsaacsHeartLaser = true;
  g.p.FireBrimstone(tear.Velocity);
  g.run.spawningIsaacsHeartLaser = false;
  tear.Remove();
}

// CollectibleType.THE_WIZ (358)
function theWiz(tear: EntityTear) {
  if (!g.p.HasCollectible(CollectibleType.THE_WIZ) || g.run.wizDoubleTear) {
    return;
  }

  g.run.wizDoubleTear = true;
  g.p.FireTear(g.p.Position, tear.Velocity.mul(-1), false, false, false);
  g.run.wizDoubleTear = false;
}

// CollectibleTypeCustom.FIRE_MIND_IMPROVED (replacing 257)
function fireMind(tear: EntityTear) {
  if (!g.p.HasCollectible(CollectibleTypeCustom.FIRE_MIND_IMPROVED)) {
    return;
  }

  // Mark that we shot this tear.
  tear.SubType = 1;
}

// CollectibleTypeCustom.STRABISMUS
function strabismus(tear: EntityTear) {
  if (
    !g.p.HasCollectible(CollectibleTypeCustom.STRABISMUS) ||
    g.run.strabismusDoubleTear
  ) {
    return;
  }

  // Spawn a new tear with a random velocity.
  const seed = tear.GetDropRNG().GetSeed();
  math.randomseed(seed);
  const rotation = math.random(1, 359);
  const velocity = tear.Velocity.Rotated(rotation);
  g.run.strabismusDoubleTear = true;
  g.p.FireTear(g.p.Position, velocity, false, false, false);
  g.run.strabismusDoubleTear = false;
}

// CollectibleTypeCustom.U235
function u235(tear: EntityTear) {
  if (!g.p.HasCollectible(CollectibleTypeCustom.U235)) {
    return;
  }

  // Every 8th tear is a bomb.
  if (g.run.tearCounter % 8 === 0) {
    const bomb = spawnBombWithSeed(
      BombVariant.NORMAL,
      0,
      tear.Position,
      tear.InitSeed,
      tear.Velocity,
    );
    bomb.ExplosionDamage = g.p.Damage * 5 + 30; // Same formula as Dr. Fetus

    tear.Remove();
  }
}

function pillAether(tear: EntityTear) {
  if (g.run.pills.aether === 0) {
    return;
  }

  // Shoot 8 tears at a time.
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

  const roomShape = g.r.GetRoomShape();
  const fireDirection = g.p.GetFireDirection();

  const direction =
    fireDirection === Direction.NO_DIRECTION
      ? g.run.lastFireDirection
      : fireDirection;

  let amountToAdd = 1;
  if (direction === Direction.LEFT || direction === Direction.RIGHT) {
    amountToAdd = 15;
    if (roomShape >= RoomShape.SHAPE_2x1) {
      amountToAdd = 28;
    }
  }

  // Make a list of the walls to shoot from.
  const wallCoordinates = pills.ROOM_SHAPE_WALL_COORDINATES[roomShape];
  const coordinates = wallCoordinates.get(direction);
  if (coordinates === undefined) {
    error(
      `Failed to get the wall coordinates for direction: ${Direction[direction]}`,
    );
  }
  const [
    startingGridCoordinate,
    numTimesToIterate,
    startingGridCoordinateForSecondWall,
  ] = coordinates;
  const walls: int[] = [];
  for (let i = 0; i < numTimesToIterate; i++) {
    const coordinate = startingGridCoordinate + i * amountToAdd;
    walls.push(coordinate);
  }
  if (startingGridCoordinateForSecondWall !== undefined) {
    // Only for L rooms.
    for (let i = 0; i < numTimesToIterate; i++) {
      const coordinate = startingGridCoordinateForSecondWall + i * amountToAdd;
      walls.push(coordinate);
    }
  }

  for (const wall of walls) {
    const gridEntity = g.r.GetGridEntity(wall);
    if (gridEntity === undefined) {
      continue;
    }

    const saveState = gridEntity.GetSaveState();
    if (saveState.Type !== GridEntityType.WALL) {
      continue;
    }

    // By default, the tear will get hit by the collision of the wall, so we need to move it closer
    // to the center of the room.
    let adjustedPosition = gridEntity.Position;
    const distanceToAdjust = 15;
    if (direction === Direction.LEFT) {
      adjustedPosition = adjustedPosition.add(Vector(distanceToAdjust * -1, 0));
    } else if (direction === Direction.UP) {
      adjustedPosition = adjustedPosition.add(Vector(0, distanceToAdjust * -1));
    } else if (direction === Direction.RIGHT) {
      adjustedPosition = adjustedPosition.add(Vector(distanceToAdjust, 0));
    } else if (direction === Direction.DOWN) {
      adjustedPosition = adjustedPosition.add(Vector(0, distanceToAdjust));
    }

    g.p.FireTear(adjustedPosition, tear.Velocity, false, true, false);
  }

  g.run.pills.wallsHaveEyesShooting = false;
}

function removeFear(tear: EntityTear) {
  tear.TearFlags = removeFlag(tear.TearFlags, TearFlag.FEAR);
}

function familiars(tear: EntityTear) {
  let damage = 3.5 + g.p.Damage * FAMILIAR_TEAR_DAMAGE;
  if (g.p.HasCollectible(CollectibleType.BFFS)) {
    damage *= 2;
  }

  // If the player has Tiny Planet, the velocity of the familiar's tears will be messed up. Manually
  // detect the direction and fix this.
  let velocity = tear.Velocity;
  if (g.p.HasCollectible(CollectibleType.TINY_PLANET)) {
    velocity = misc.getVelocityFromAimDirection();
  }

  const familiarEntities = Isaac.FindByType(
    EntityType.FAMILIAR,
    -1,
    -1,
    false,
    false,
  );
  for (const familiar of familiarEntities) {
    switch (familiar.Variant) {
      case FamiliarVariant.BROTHER_BOBBY: // 1
      case FamiliarVariant.DEMON_BABY: // 2
      case FamiliarVariant.LITTLE_GISH: // 4
      case FamiliarVariant.LITTLE_STEVEN: // 5
      case FamiliarVariant.SISTER_MAGGY: // 7
      case FamiliarVariant.GHOST_BABY: // 9
      case FamiliarVariant.RAINBOW_BABY: // 11
      case FamiliarVariant.ISAACS_HEAD: // 12
      case FamiliarVariant.MONGO_BABY: // 74
      case FamiliarVariant.SERAPHIM: {
        // 92
        spawnTearWithIncreasedDmg(tear, familiar, velocity, damage);
        break;
      }

      case FamiliarVariant.ROBO_BABY: {
        // 6
        const laser = g.p.FireTechLaser(
          familiar.Position,
          LaserOffset.TECH_1,
          velocity,
          false,
          false,
        );
        laser.CollisionDamage = damage;
        break;
      }

      case FamiliarVariant.HARLEQUIN_BABY: {
        // 10
        for (let i = 0; i < 2; i++) {
          if (i === 1) {
            velocity = velocity.Rotated(-10);
          } else if (i === 2) {
            velocity = velocity.Rotated(10);
          }
          const familiarTear = spawnTear(
            TearVariant.BLUE,
            0,
            familiar.Position,
            velocity,
          );
          familiarTear.Scale = tear.Scale * FAMILIAR_TEAR_SCALE;
          familiarTear.CollisionDamage = damage;
        }
        break;
      }

      case FamiliarVariant.LIL_LOKI: {
        // 97
        for (let i = 0; i < 4; i++) {
          const familiarTear = spawnTear(
            TearVariant.BLUE,
            0,
            familiar.Position,
            velocity,
          );
          velocity = velocity.Rotated(90);
          familiarTear.Scale = tear.Scale * FAMILIAR_TEAR_SCALE;
          familiarTear.CollisionDamage = damage;
        }
        break;
      }

      default: {
        break;
      }
    }
  }
}

function spawnTearWithIncreasedDmg(
  tear: EntityTear,
  familiar: Entity,
  velocity: Vector,
  damage: number,
) {
  const familiarTear = spawnTear(
    TearVariant.BLUE,
    0,
    familiar.Position,
    velocity,
  );
  familiarTear.Scale = tear.Scale * FAMILIAR_TEAR_SCALE;
  familiarTear.CollisionDamage = damage;

  switch (familiar.Variant) {
    // 4
    case FamiliarVariant.LITTLE_GISH: {
      familiarTear.SetColor(BLACK_COLOR, 10000, 1000, false, false);
      familiarTear.TearFlags = addFlag(familiarTear.TearFlags, TearFlag.SLOW);
      break;
    }

    // 5
    case FamiliarVariant.LITTLE_STEVEN: {
      familiarTear.SetColor(PURPLE_COLOR, 10000, 1000, false, false);
      familiarTear.TearFlags = addFlag(familiarTear.TearFlags, TearFlag.HOMING);
      break;
    }

    // 9
    case FamiliarVariant.GHOST_BABY: {
      familiarTear.SetColor(FADED_COLOR, 10000, 1000, false, false);
      familiarTear.TearFlags = addFlag(
        familiarTear.TearFlags,
        TearFlag.SPECTRAL,
      );
      break;
    }

    // 11
    case FamiliarVariant.RAINBOW_BABY: {
      familiarTear.SetColor(PINK_COLOR, 10000, 1000, false, false);
      math.randomseed(g.g.GetFrameCount());
      const tearFlag = getRandomEnumValue(TearFlag);
      familiarTear.TearFlags = addFlag(familiarTear.TearFlags, tearFlag);
      break;
    }

    // 74
    case FamiliarVariant.MONGO_BABY: {
      // Shoot a second tear a few frames from now.
      g.run.room.mongoBabyTears.push({
        frame: g.g.GetFrameCount() + 3,
        familiar: EntityRef(familiar),
        velocity,
        damage,
        scale: tear.Scale * FAMILIAR_TEAR_SCALE,
      });
      break;
    }

    // 92
    case FamiliarVariant.SERAPHIM: {
      // Sacred Heart gives a 89.53% damage up, so emulate this.
      familiarTear.CollisionDamage = damage * 1.8953;
      familiarTear.SetColor(WHITE_COLOR, 10000, 1000, false, false);
      familiarTear.TearFlags = addFlag(familiarTear.TearFlags, TearFlag.HOMING);
      break;
    }

    default: {
      error(
        `The familiar variant was an unknown value of: ${familiar.Variant}`,
      );
    }
  }
}
