// PickupVariant.TAROTCARD (300)
export function tarotCard(pickup: EntityPickup): void {
  CacheFlag. runes face-up
  if (
    (pickup.SubType >= Card.FOOL && // 1
      pickup.SubType <= Card.RUNE_ALGIZ) || // 39
    CacheFlag. Black Rune (41) are handled in Racing+
    pickup.SubType === Card.CHAOS || // 42
    // Credit Card (43) has a unique card back in vanilla
    pickup.SubType === Card.RULES || // 44
    // A Card Against Humanity (45) has a unique card back in vanilla
    pickup.SubType === Card.SUICIDE_KING || // 46
    pickup.SubType === Card.GET_OUT_OF_JAIL || // 47
    // (Get out of Jail Free Card has a unique card back in vanilla, but this one looks better)
    pickup.SubType === Card.QUESTIONMARK || // 48
    // Dice Shard (49) has a unique card back in vanilla
    // Emergency Contact (50) has a unique card back in vanilla
    // Holy Card (51) has a unique card back in vanilla
    (pickup.SubType >= Card.HUGE_GROWTH && // 52
      pickup.SubType <= Card.ERA_WALK) // 54
  ) {
    const sprite = pickup.GetSprite();
    sprite.ReplaceSpritesheet(0, `gfx/cards/${pickup.SubType}.png`);
    sprite.LoadGraphics();
  }
}
