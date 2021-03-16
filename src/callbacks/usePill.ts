import { ZERO_VECTOR } from "../constants";
import g from "../globals";
import * as pills from "../pills";
import * as postNewRoom from "./postNewRoom";

export function damageUp(): void {
  let damageAmount = 2;
  if (g.p.HasCollectible(CollectibleType.COLLECTIBLE_PHD)) {
    damageAmount *= 2;
  }
  g.run.pills.damageUp += damageAmount;
  g.p.AddCacheFlags(CacheFlag.CACHE_DAMAGE);
  g.p.EvaluateItems();
  pills.animateHappy();
}

export function tearDelayDown(): void {
  let delayAmount = 1;
  if (g.p.HasCollectible(CollectibleType.COLLECTIBLE_PHD)) {
    delayAmount = 2;
  }
  g.run.pills.tearDelayDown += delayAmount;
  g.p.AddCacheFlags(CacheFlag.CACHE_FIREDELAY);
  g.p.EvaluateItems();
  pills.animateHappy();
}

export function dealAffinity(): void {
  // Local variables
  const stage = g.l.GetStage();

  if (stage === 1 || stage === 2) {
    // It is impossible to get a Devil Room on the first floor
    // On the second floor, we already have a 100% chance to get a Devil Room
    pills.animateHappy();
    return;
  }

  // "g.g.GetLastDevilRoomStage()" is bugged and returns userdata instead of an integer
  const lastDevilStage = RacingPlusGlobals.run.lastDDLevel;
  let levelModifier = 1;
  if (g.p.HasCollectible(CollectibleType.COLLECTIBLE_PHD)) {
    levelModifier = 2;
  }
  let newLastDevilStage = lastDevilStage - levelModifier;
  if (newLastDevilStage < 0) {
    newLastDevilStage = 0;
  }
  g.g.SetLastDevilRoomStage(newLastDevilStage);
  pills.animateHappy();
}

export function boneAffinity(pillEffect: int): void {
  let numBones = 10;
  if (g.p.HasCollectible(CollectibleType.COLLECTIBLE_PHD)) {
    numBones *= 2;
  }

  for (let i = 0; i < numBones; i++) {
    Isaac.Spawn(
      EntityType.ENTITY_FAMILIAR,
      FamiliarVariant.BONE_ORBITAL,
      0,
      g.p.Position,
      ZERO_VECTOR,
      g.p,
    );
  }

  animateUse(pillEffect);
}

export function restock(pillEffect: int): void {
  // Spawn a Restock Machine
  g.run.spawningRestock = true;
  g.p.UseCard(Card.CARD_WHEEL_OF_FORTUNE);

  // PHD causes this pill to spawn two Restock Machines
  if (g.p.HasCollectible(CollectibleType.COLLECTIBLE_PHD)) {
    g.run.spawningRestock = true;
    g.p.UseCard(Card.CARD_WHEEL_OF_FORTUNE);
  }

  animateUse(pillEffect);
}

export function goldenDump(pillEffect: int): void {
  // Spawn Gold Poop at the player's position
  let position = g.p.Position;
  Isaac.GridSpawn(
    GridEntityType.GRID_POOP,
    PoopVariant.POOP_GOLDEN,
    position,
    false,
  );

  // PHD causes this pill to spawn two Gold Poops
  if (g.p.HasCollectible(CollectibleType.COLLECTIBLE_PHD)) {
    position = g.r.FindFreePickupSpawnPosition(g.p.Position, 1, true);
    Isaac.GridSpawn(
      GridEntityType.GRID_POOP,
      PoopVariant.POOP_GOLDEN,
      position,
      false,
    );
  }

  // Playing "SOUND_FART" will randomly play one of the three farting sound effects
  g.sfx.Play(SoundEffect.SOUND_FART, 1, 0, false, 1);

  // Turn the room to gold for fun
  // This will also make any existing poops in the room turn to gold
  g.r.TurnGold();

  animateUse(pillEffect);
}

export function glimpse(pillEffect: int): void {
  g.l.ApplyCompassEffect(false);
  // (PHD has no effect on this pill)

  animateUse(pillEffect);
}

export function superSadness(): void {
  g.run.pills.superSadness = g.g.GetFrameCount() + pills.getDuration();
  g.p.AddCacheFlags(CacheFlag.CACHE_FIREDELAY);
  g.p.EvaluateItems();
  pills.animateHappy();
}

export function invincibility(): void {
  g.run.pills.invincibility = g.g.GetFrameCount() + pills.getDuration();
  g.p.AddNullCostume(NullItemID.ID_STATUE);
  pills.animateHappy();
}

export function reallyBadGas(pillEffect: int): void {
  g.run.pills.reallyBadGas = g.g.GetFrameCount() + pills.getDuration();
  animateUse(pillEffect);
}

export function aether(): void {
  g.run.pills.aether = g.g.GetFrameCount() + pills.getDuration();
  pills.animateHappy();
}

export function wallsHaveEyes(): void {
  g.run.pills.wallsHaveEyes = g.g.GetFrameCount() + pills.getDuration();
  pills.animateHappy();
}

export function bladderInfection(pillEffect: int): void {
  g.run.pills.bladderInfection = g.g.GetFrameCount() + pills.getDuration();
  animateUse(pillEffect);
}

export function scorchedEarth(pillEffect: int): void {
  let numFires = 80;
  if (g.p.HasCollectible(CollectibleType.COLLECTIBLE_PHD)) {
    numFires *= 2;
  }
  g.run.pills.scorchedEarth = numFires;
  animateUse(pillEffect);
}

export function familiarFrenzy(pillEffect: int): void {
  g.run.pills.familiarFrenzy = g.g.GetFrameCount() + pills.getDuration();
  postNewRoom.familiarFrenzy();
  animateUse(pillEffect);
}

export function unlock(): void {
  g.p.UseActiveItem(
    CollectibleType.COLLECTIBLE_DADS_KEY,
    true,
    false,
    false,
    false,
  );
  // (PHD has no effect on this pill)
}

function animateUse(thisPillEffect: PillEffect) {
  // Get the color of this effect
  let thisPillColor;
  g.run.pills.effects.forEach((pillEffect, pillColor) => {
    if (pillEffect === thisPillEffect) {
      thisPillColor = pillColor;
    }
  });
  if (thisPillColor === undefined) {
    thisPillColor = PillColor.PILL_BLUE_BLUE;
  }

  g.p.AnimatePill(thisPillColor, "UseItem");

  const pillName = g.itemConfig.GetPillEffect(thisPillEffect).Name;
  RacingPlusGlobals.run.streakText = pillName;
}
