import { CollectibleType, ModCallback } from "isaac-typescript-definitions";
import g from "../globals";

export function init(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_KNIFE_UPDATE, main);
}

export function main(knife: EntityKnife): void {
  if (g.run.knifeCooldownFrames > 0) {
    return;
  }

  const isFlying = knife.IsFlying();
  const flyingLastFrame = g.run.room.knifeFlying.get(knife.Index);
  if (flyingLastFrame === undefined) {
    g.run.room.knifeFlying.set(knife.Index, isFlying);
    g.run.room.knifePositions.set(
      knife.Index,
      Vector(knife.Position.X, knife.Position.Y),
    );
    return;
  }

  if (isFlying && !flyingLastFrame) {
    // Calculate the velocity. (The velocity of the knife will always be 0, even if it is flying
    // across the room.)
    let lastKnifePosition = g.run.room.knifePositions.get(knife.Index);
    if (lastKnifePosition === undefined) {
      lastKnifePosition = Vector(knife.Position.X, knife.Position.Y);
    }
    const velocity = knife.Position.sub(lastKnifePosition);

    // Fire a tear and then immediately remove it, which will cause familiars to shoot a tear (if
    // any).
    const fakeTear = g.p.FireTear(g.p.Position, velocity, false, true, false);
    fakeTear.Remove();

    g.run.familiarMultiShot = 3; // For a total of 4
    if (g.p.HasCollectible(CollectibleType.ISAACS_HEART)) {
      g.run.familiarMultiShot = 0;
    }
    g.run.familiarMultiShotVelocity = velocity;

    // Prevent the player from spamming the knife in order to get a bunch of familiar shots.
    g.run.knifeCooldownFrames = 45; // 1.5 seconds
  }

  g.run.room.knifeFlying.set(knife.Index, isFlying);
  g.run.room.knifePositions.set(
    knife.Index,
    Vector(knife.Position.X, knife.Position.Y),
  );
}
