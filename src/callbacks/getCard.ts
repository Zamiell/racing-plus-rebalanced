const REPLACEMENT_CARDS = [
  Card.CARD_CHAOS, // 42
  Card.CARD_CREDIT, // 43
  Card.CARD_SUICIDE_KING, // 46
  Card.CARD_GET_OUT_OF_JAIL, // 47
  Card.CARD_EMERGENCY_CONTACT, // 50
  Card.CARD_HOLY, // 51
  Card.CARD_HUGE_GROWTH, // 52
  Card.CARD_ANCIENT_RECALL, // 53
  Card.CARD_ERA_WALK, // 54
];

export function main(rng: RNG, card: int): int | null {
  // Remove the Rules Card && A Card Against Humanity from the game
  if (
    card !== Card.CARD_RULES && // 44
    card !== Card.CARD_HUMANITY // 45
  ) {
    return null;
  }

  math.randomseed(rng.GetSeed());
  const randomIndex = math.random(0, REPLACEMENT_CARDS.length - 1);
  return REPLACEMENT_CARDS[randomIndex];
}
