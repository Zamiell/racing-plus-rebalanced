import { TECHNOLOGY_EXCEPTION_ITEMS } from "../constants";
import g from "../globals";

export function postUpdate(): void {
  // Technology grants 2 lasers, but only if they do not have a powerful other item
  // Check to see if they got a powerful item after they have picked up Technology
  if (g.run.technologyAdded2020 && hasPowerfulItem()) {
    g.run.technologyAdded2020 = false;
    g.p.RemoveCollectible(CollectibleType.COLLECTIBLE_20_20); // 245
  }
}

export function postItemPickup(): void {
  // Technology grants 2 lasers, but only if they do not have a powerful other item
  if (!hasPowerfulItem()) {
    g.run.technologyAdded2020 = true;
    g.p.AddCollectible(CollectibleType.COLLECTIBLE_20_20, 0, false); // 245
    Isaac.DebugString("Removing collectible 245 (20/20)");
  }
}

function hasPowerfulItem(): boolean {
  for (const item of TECHNOLOGY_EXCEPTION_ITEMS) {
    if (g.p.HasCollectible(item)) {
      return true;
    }
  }

  return false;
}
