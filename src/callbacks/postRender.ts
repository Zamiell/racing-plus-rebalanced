import { ModCallback } from "isaac-typescript-definitions";
import { updateCachedAPIFunctions } from "../cache";
import g from "../globals";

export function init(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_RENDER, main);
}

function main() {
  updateCachedAPIFunctions();
  checkRacingPlus();
}

function checkRacingPlus() {
  if (g.racingPlusEnabled) {
    return;
  }

  let x = 115;
  let y = 70;
  let text = "Error. The Racing+ Rebalanced mod requires";
  Isaac.RenderText(text, x, y, 2, 2, 2, 2);

  x += 42;
  y += 10;
  text = "that you also enable the Racing+ mod.";
  Isaac.RenderText(text, x, y, 2, 2, 2, 2);
}
