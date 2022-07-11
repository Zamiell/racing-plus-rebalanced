import { Card, ModCallback } from "isaac-typescript-definitions";
import { getRandomArrayElement } from "isaacscript-common";

const REPLACEMENT_CARDS = [
  Card.CHAOS, // 42
  Card.CREDIT, // 43
  Card.SUICIDE_KING, // 46
  Card.GET_OUT_OF_JAIL_FREE, // 47
  Card.EMERGENCY_CONTACT, // 50
  Card.HOLY, // 51
  Card.HUGE_GROWTH, // 52
  Card.ANCIENT_RECALL, // 53
  Card.ERA_WALK, // 54
];

export function init(mod: Mod): void {
  mod.AddCallback(ModCallback.GET_CARD, main);
}

function main(rng: RNG, card: Card): int | undefined {
  // Remove the Rules Card and A Card Against Humanity from the game.
  if (
    card !== Card.RULES && // 44
    card !== Card.AGAINST_HUMANITY // 45
  ) {
    return undefined;
  }

  const randomReplacementCardIndex = getRandomArrayElement(
    REPLACEMENT_CARDS,
    rng,
  );
  return REPLACEMENT_CARDS[randomReplacementCardIndex];
}
