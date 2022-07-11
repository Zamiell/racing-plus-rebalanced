import {
  CollectibleType,
  EntityType,
  ModCallback,
} from "isaac-typescript-definitions";
import g from "../globals";

export function init(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_BOMB_UPDATE, main);
}

export function main(bomb: EntityBomb): void {
  if (bomb.SpawnerType !== EntityType.PLAYER || bomb.FrameCount !== 1) {
    return;
  }

  drFetus(bomb); // 52
}

// CollectibleType.DR_FETUS (52)
function drFetus(bomb: EntityBomb) {
  if (!g.p.HasCollectible(CollectibleType.DR_FETUS)) {
    return;
  }

  if (!bomb.IsFetus) {
    return;
  }

  // Familiars shoot twice for each Dr. Fetus bomb to make up for the fact that it takes you from 10
  // tear delay to 25. (We can't shoot on the same frame like we do in the laser callback because
  // this code happens before `POST_UPDATE`.)
  g.run.familiarMultiShot = 2;
  g.run.familiarMultiShotVelocity = bomb.Velocity;
}
