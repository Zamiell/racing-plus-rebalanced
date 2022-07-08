import {
  CacheFlag,
  CollectibleType,
  FamiliarVariant,
  LevelStage,
} from "isaac-typescript-definitions";
import { repeat, spawnFamiliar, VectorZero } from "isaacscript-common";
import * as postNewRoom from "../callbacksCustom/postNewRoomReordered";
import g from "../globals";
import * as pills from "../pills";

export function damageUp(): void {
  let damageAmount = 2;
  if (g.p.HasCollectible(CollectibleType.PHD)) {
    damageAmount *= 2;
  }
  g.run.pills.damageUp += damageAmount;
  g.p.AddCacheFlags(CacheFlag.DAMAGE);
  g.p.EvaluateItems();
  pills.animateHappy();
}

export function tearDelayDown(): void {
  let delayAmount = 1;
  if (g.p.HasCollectible(CollectibleType.PHD)) {
    delayAmount = 2;
  }
  g.run.pills.tearDelayDown += delayAmount;
  g.p.AddCacheFlags(CacheFlag.FIRE_DELAY);
  g.p.EvaluateItems();
  pills.animateHappy();
}

export function dealAffinity(): void {
  // Local variables
  const stage = g.l.GetStage();

  if (stage === LevelStage.BASEMENT_1 || stage === LevelStage.BASEMENT_2) {
    // It is impossible to get a Devil Room on the first floor. On the second floor, we already have
    // a 100% chance to get a Devil Room.
    pills.animateHappy();
    return;
  }

  // The "Game.GetLastDevilRoomStage" method is bugged and returns userdata instead of an integer.
  const lastDevilStage = RacingPlusGlobals.run.lastDDLevel;
  let levelModifier = 1;
  if (g.p.HasCollectible(CollectibleType.PHD)) {
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
  if (g.p.HasCollectible(CollectibleType.PHD)) {
    numBones *= 2;
  }

  repeat(numBones, () => {
    spawnFamiliar(
      FamiliarVariant.BONE_ORBITAL,
      0,
      g.p.Position,
      VectorZero,
      g.p,
    );
  });

  animateUse(pillEffect);
}

export function restock(pillEffect: int): void {
  // Spawn a Restock Machine
  g.run.spawningRestock = true;
  g.p.UseCard(Card.WHEEL_OF_FORTUNE);

  // PHD causes this pill to spawn two Restock Machines
  if (g.p.HasCollectible(CollectibleType.PHD)) {
    g.run.spawningRestock = true;
    g.p.UseCard(Card.WHEEL_OF_FORTUNE);
  }

  animateUse(pillEffect);
}

export function goldenDump(pillEffect: int): void {
  // Spawn Gold Poop at the player's position
  let position = g.p.Position;
  Isaac.GridSpawn(
    GridEntityType.POOP,
    PoopVariant.POOP_GOLDEN,
    position,
    false,
  );

  // PHD causes this pill to spawn two Gold Poops
  if (g.p.HasCollectible(CollectibleType.PHD)) {
    position = g.r.FindFreePickupSpawnPosition(g.p.Position, 1, true);
    Isaac.GridSpawn(
      GridEntityType.POOP,
      PoopVariant.POOP_GOLDEN,
      position,
      false,
    );
  }

  // Playing "SOUND_FART" will randomly play one of the three farting sound effects
  sfxManager.Play(SoundEffect.FART, 1, 0, false, 1);

  // Turn the room to gold for fun This will also make any existing poops in the room turn to gold
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
  g.p.AddCacheFlags(CacheFlag.FIRE_DELAY);
  g.p.EvaluateItems();
  pills.animateHappy();
}

export function invincibility(): void {
  g.run.pills.invincibility = g.g.GetFrameCount() + pills.getDuration();
  g.p.AddNullCostume(NullItemID.STATUE);
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
  if (g.p.HasCollectible(CollectibleType.PHD)) {
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
  g.p.UseActiveItem(CollectibleType.DADS_KEY, true, false, false, false);
  // (PHD has no effect on this pill)
}

function animateUse(thisPillEffect: PillEffect) {
  // Get the color of this effect
  let thisPillColor: int | undefined;
  for (const [pillColor, pillEffect] of g.run.pills.effects.entries()) {
    if (pillEffect === thisPillEffect) {
      thisPillColor = pillColor;
    }
  }
  if (thisPillColor === undefined) {
    thisPillColor = PillColor.BLUE_BLUE;
  }

  g.p.AnimatePill(thisPillColor, "UseItem");

  const pillName = itemConfig.GetPillEffect(thisPillEffect).Name;
  RacingPlusGlobals.run.streakText = pillName;
}
