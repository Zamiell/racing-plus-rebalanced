import g from "../globals";
import * as misc from "../misc";
import * as NPCUpdate from "./NPCUpdate";

// FamiliarVariant.LEECH (56)
export function leech(familiar: EntityFamiliar): void {
  // Fade the leeches so that it is easier to see real enemies
  NPCUpdate.fade(familiar);
}

// FamiliarVariant.YO_LISTEN (111)
export function yoListen(familiar: EntityFamiliar): void {
  // Speed it up slightly.
  if (familiar.FrameCount % 5 === 0) {
    familiar.Velocity = familiar.Velocity.mul(1.5);
  }

  // Destroy tinted rocks, secret room walls, and so forth.
  if (
    familiar.Velocity.X > -0.5 &&
    familiar.Velocity.X < 0.5 &&
    familiar.Velocity.Y > -0.5 &&
    familiar.Velocity.Y < 0.5
  ) {
    const gridEntity = g.r.GetGridEntityFromPos(familiar.Position);
    if (gridEntity !== undefined) {
      gridEntity.Destroy(true);
    }
  }
}

export function preventStacking(familiar: EntityFamiliar): void {
  // By default, some familiars will perfectly stack on each other. Manually keep them separated
  // from each other for visibility.
  const familiars = Isaac.FindByType(
    familiar.Type,
    familiar.Variant,
    -1,
    false,
    false,
  );
  for (const familiar2 of familiars) {
    if (
      familiar.Position.Distance(familiar2.Position) <= 1 &&
      // Use the index as a priority of which familiar is forced to move away
      familiar.Index < familiar2.Index
    ) {
      familiar2.Position = misc.getRandomOffsetPosition(
        familiar2.Position,
        8,
        familiar2.InitSeed,
      );
    }
  }
}
