import { FamiliarVariant, ModCallback } from "isaac-typescript-definitions";
import g from "../globals";
import * as misc from "../misc";
import * as postNPCUpdate from "./postNPCUpdate";

const PREVENT_STACKING_FAMILIAR_VARIANTS = [
  FamiliarVariant.LITTLE_CHUBBY, // 3
  FamiliarVariant.DEAD_BIRD, // 14
  FamiliarVariant.EVES_BIRD_FOOT, // 15
  FamiliarVariant.LEECH, // 56
  FamiliarVariant.LIL_HAUNT, // 63
  FamiliarVariant.SISSY_LONGLEGS, // 66
  FamiliarVariant.LIL_GURDY, // 87
  FamiliarVariant.BIG_CHUBBY, // 104
];

export function init(mod: Mod): void {
  mod.AddCallback(
    ModCallback.POST_FAMILIAR_UPDATE,
    leech,
    FamiliarVariant.LEECH, // 56
  );

  mod.AddCallback(
    ModCallback.POST_FAMILIAR_UPDATE,
    yoListen,
    FamiliarVariant.YO_LISTEN, // 111
  );

  for (const familiarVariant of PREVENT_STACKING_FAMILIAR_VARIANTS) {
    mod.AddCallback(
      ModCallback.POST_FAMILIAR_UPDATE,
      preventStacking,
      familiarVariant,
    );
  }
}

// FamiliarVariant.LEECH (56)
export function leech(familiar: EntityFamiliar): void {
  // Fade the leeches so that it is easier to see real enemies.
  postNPCUpdate.fade(familiar);
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
      // Use the index as a priority of which familiar is forced to move away.
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
