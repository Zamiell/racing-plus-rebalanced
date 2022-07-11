import { Card, ModCallback, PickupVariant } from "isaac-typescript-definitions";

export function init(mod: Mod): void {
  mod.AddCallback(
    ModCallback.POST_PICKUP_INIT,
    tarotCard,
    PickupVariant.TAROT_CARD, // 300
  );
}

// PickupVariant.TAROT_CARD (300)
function tarotCard(pickup: EntityPickup) {
  const card = pickup as EntityPickupCard;

  if (shouldReplaceCardBack(card.SubType)) {
    const sprite = pickup.GetSprite();
    sprite.ReplaceSpritesheet(0, `gfx/cards/${pickup.SubType}.png`);
    sprite.LoadGraphics();
  }
}

function shouldReplaceCardBack(card: Card) {
  return (
    (card >= Card.FOOL && // 1
      card <= Card.RUNE_ALGIZ) || // 39
    // Black Rune (41) are handled in Racing+.
    card === Card.CHAOS || // 42
    // Credit Card (43) has a unique card back in vanilla.
    card === Card.RULES || // 44
    // A Card Against Humanity (45) has a unique card back in vanilla.
    card === Card.SUICIDE_KING || // 46
    // Get out of Jail Free Card has a unique card back in vanilla, but this one looks better.
    card === Card.GET_OUT_OF_JAIL_FREE || // 47
    card === Card.QUESTION_MARK || // 48
    // - Dice Shard (49) has a unique card back in vanilla.
    // - Emergency Contact (50) has a unique card back in vanilla.
    // - Holy Card (51) has a unique card back in vanilla.
    (card >= Card.HUGE_GROWTH && // 52
      card <= Card.ERA_WALK) // 54
  );
}
