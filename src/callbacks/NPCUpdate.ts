import { EntityFlag } from "isaac-typescript-definitions";
import { FLY_ENTITIES, SPIDER_ENTITIES } from "../constants";
import g from "../globals";

export function main(npc: EntityNPC): void {
  // Items
  skatole(npc); // 9
  burstingSack(npc); // 377
  delirious(npc); // 510

  // Entity flags
  removeCharm(npc); // 1 << 8
  checkTemporaryCharm(npc); // 1 << 8
  removeConfusion(npc); // 1 << 9
  removeFear(npc); // 1 << 11
  fadeFriendly(npc); // 1 << 29
}

// CollectibleType.SKATOLE (9)
function skatole(npc: EntityNPC) {
  if (
    !g.p.HasCollectible(CollectibleType.SKATOLE) ||
    npc.HasEntityFlags(EntityFlag.FRIENDLY)
  ) {
    return;
  }

  if (FLY_ENTITIES.includes(npc.Type)) {
    npc.AddEntityFlags(EntityFlag.CHARM); // 1 << 8
    npc.AddEntityFlags(EntityFlag.FRIENDLY); // 1 << 29
    npc.AddEntityFlags(EntityFlag.PERSISTENT); // 1 << 37
  }
}

// CollectibleType.BURSTING_SACK (377)
function burstingSack(npc: EntityNPC) {
  if (
    !g.p.HasCollectible(CollectibleType.BURSTING_SACK) ||
    npc.HasEntityFlags(EntityFlag.FRIENDLY)
  ) {
    return;
  }

  if (SPIDER_ENTITIES.includes(npc.Type)) {
    npc.AddEntityFlags(EntityFlag.CHARM); // 1 << 8
    npc.AddEntityFlags(EntityFlag.FRIENDLY); // 1 << 29
    npc.AddEntityFlags(EntityFlag.PERSISTENT); // 1 << 37
  }
}

// CollectibleType.DELIRIOUS (510)
function delirious(npc: EntityNPC) {
  // Buff Delirious
  if (
    npc.HasEntityFlags(EntityFlag.FRIENDLY) && // 1 << 29
    !npc.HasEntityFlags(EntityFlag.PERSISTENT) // 1 << 37
  ) {
    npc.AddEntityFlags(EntityFlag.PERSISTENT); // 1 << 37
  }
}

// EntityFlag.CHARM (1 << 8)
function removeCharm(npc: EntityNPC) {
  // We remove charm from all bosses
  if (npc.HasEntityFlags(EntityFlag.CHARM) && npc.IsBoss()) {
    npc.ClearEntityFlags(EntityFlag.CHARM);
  }
}

// EntityFlag.CHARM (1 << 8)
function checkTemporaryCharm(npc: EntityNPC) {
  if (
    !npc.HasEntityFlags(EntityFlag.CHARM) ||
    npc.IsBoss() ||
    npc.HasEntityFlags(EntityFlag.FRIENDLY) || // 1 << 29
    npc.HasEntityFlags(EntityFlag.PERSISTENT) // 1 << 37
  ) {
    return;
  }

  // Check for Lil' Haunts to prevent the softlock where charming a Lil' Haunt will make The Haunt
  // unkillable
  if (npc.Type === EntityType.THE_HAUNT && npc.Variant === 1) {
    const haunts = Isaac.FindByType(EntityType.THE_HAUNT, 0, -1, false, false);
    if (haunts.length !== 0) {
      return;
    }
  }

  // Make it permanently charmed instead of temporarily charmed
  npc.AddEntityFlags(EntityFlag.FRIENDLY); // 1 << 29
  npc.AddEntityFlags(EntityFlag.PERSISTENT); // 1 << 37

  // Champions are bugged with charm such that the fading code does not work Thus, just delete them
  // and replace them with a non-champion version
  if (npc.IsChampion()) {
    const newNPC = g.g.Spawn(
      npc.Type,
      npc.Variant,
      npc.Position,
      npc.Velocity,
      npc.SpawnerEntity,
      npc.SubType,
      0,
    );
    newNPC.AddEntityFlags(EntityFlag.FRIENDLY); // 1 << 29
    newNPC.AddEntityFlags(EntityFlag.PERSISTENT); // 1 << 37
    npc.Remove();
  }
}

// EntityFlag.CONFUSION (1 << 9)
function removeConfusion(npc: EntityNPC) {
  // We remove confusion from all enemies
  if (npc.HasEntityFlags(EntityFlag.CONFUSION)) {
    npc.ClearEntityFlags(EntityFlag.CONFUSION);
  }
}

// EntityFlag.FEAR (1 << 11)
function removeFear(npc: EntityNPC) {
  // We remove fear from all enemies
  if (npc.HasEntityFlags(EntityFlag.FEAR)) {
    npc.ClearEntityFlags(EntityFlag.FEAR);
  }
}

// EntityFlag.FRIENDLY (1 << 29)
function fadeFriendly(npc: EntityNPC) {
  // Fade the charmed enemies so that it is easier to see everything. This needs to be applied on
  // every frame because enemies can be unfaded occasionally.
  if (npc.HasEntityFlags(EntityFlag.FRIENDLY)) {
    fade(npc);
  }
}

export function fade(entity: Entity): void {
  const color = entity.GetColor();
  const fadeAmount = 0.25;
  const newColor = Color(color.R, color.G, color.B, fadeAmount, 0, 0, 0);
  // RO, GO, and BO are float values, but the Color constructor only wants integers. So, set 0 for
  // these values instead of the existing ones.
  entity.SetColor(newColor, 0, 0, true, true);
}
