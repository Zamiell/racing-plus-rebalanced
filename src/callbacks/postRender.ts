import g from "../globals";

export function main(): void {
  // Update some cached API functions to avoid crashing
  g.l = g.g.GetLevel();
  g.r = g.g.GetRoom();
  const player = Isaac.GetPlayer(0);
  if (player !== null) {
    g.p = player;
  }
  g.seeds = g.g.GetSeeds();
  g.itemPool = g.g.GetItemPool();

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
