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

// CollectibleType.COLLECTIBLE_SKATOLE (9)
function skatole(npc: EntityNPC) {
  if (
    !g.p.HasCollectible(CollectibleType.COLLECTIBLE_SKATOLE) ||
    npc.HasEntityFlags(EntityFlag.FLAG_FRIENDLY)
  ) {
    return;
  }

  if (FLY_ENTITIES.includes(npc.Type)) {
    npc.AddEntityFlags(EntityFlag.FLAG_CHARM); // 1 << 8
    npc.AddEntityFlags(EntityFlag.FLAG_FRIENDLY); // 1 << 29
    npc.AddEntityFlags(EntityFlag.FLAG_PERSISTENT); // 1 << 37
  }
}

// CollectibleType.COLLECTIBLE_BURSTING_SACK (377)
function burstingSack(npc: EntityNPC) {
  if (
    !g.p.HasCollectible(CollectibleType.COLLECTIBLE_BURSTING_SACK) ||
    npc.HasEntityFlags(EntityFlag.FLAG_FRIENDLY)
  ) {
    return;
  }

  if (SPIDER_ENTITIES.includes(npc.Type)) {
    npc.AddEntityFlags(EntityFlag.FLAG_CHARM); // 1 << 8
    npc.AddEntityFlags(EntityFlag.FLAG_FRIENDLY); // 1 << 29
    npc.AddEntityFlags(EntityFlag.FLAG_PERSISTENT); // 1 << 37
  }
}

// CollectibleType.COLLECTIBLE_DELIRIOUS (510)
function delirious(npc: EntityNPC) {
  // Buff Delirious
  if (
    npc.HasEntityFlags(EntityFlag.FLAG_FRIENDLY) && // 1 << 29
    !npc.HasEntityFlags(EntityFlag.FLAG_PERSISTENT) // 1 << 37
  ) {
    npc.AddEntityFlags(EntityFlag.FLAG_PERSISTENT); // 1 << 37
  }
}

// EntityFlag.FLAG_CHARM (1 << 8)
function removeCharm(npc: EntityNPC) {
  // We remove charm from all bosses
  if (npc.HasEntityFlags(EntityFlag.FLAG_CHARM) && npc.IsBoss()) {
    npc.ClearEntityFlags(EntityFlag.FLAG_CHARM);
  }
}

// EntityFlag.FLAG_CHARM (1 << 8)
function checkTemporaryCharm(npc: EntityNPC) {
  if (
    !npc.HasEntityFlags(EntityFlag.FLAG_CHARM) ||
    npc.IsBoss() ||
    npc.HasEntityFlags(EntityFlag.FLAG_FRIENDLY) || // 1 << 29
    npc.HasEntityFlags(EntityFlag.FLAG_PERSISTENT) // 1 << 37
  ) {
    return;
  }

  // Check for Lil' Haunts to prevent the softlock where charming a Lil' Haunt will make The Haunt
  // unkillable
  if (npc.Type === EntityType.ENTITY_THE_HAUNT && npc.Variant === 1) {
    const haunts = Isaac.FindByType(
      EntityType.ENTITY_THE_HAUNT,
      0,
      -1,
      false,
      false,
    );
    if (haunts.length !== 0) {
      return;
    }
  }

  // Make it permanently charmed instead of temporarily charmed
  npc.AddEntityFlags(EntityFlag.FLAG_FRIENDLY); // 1 << 29
  npc.AddEntityFlags(EntityFlag.FLAG_PERSISTENT); // 1 << 37

  // Champions are bugged with charm such that the fading code does not work
  // Thus, just delete them and replace them with a non-champion version
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
    newNPC.AddEntityFlags(EntityFlag.FLAG_FRIENDLY); // 1 << 29
    newNPC.AddEntityFlags(EntityFlag.FLAG_PERSISTENT); // 1 << 37
    npc.Remove();
  }
}

// EntityFlag.FLAG_CONFUSION (1 << 9)
function removeConfusion(npc: EntityNPC) {
  // We remove confusion from all enemies
  if (npc.HasEntityFlags(EntityFlag.FLAG_CONFUSION)) {
    npc.ClearEntityFlags(EntityFlag.FLAG_CONFUSION);
  }
}

// EntityFlag.FLAG_FEAR (1 << 11)
function removeFear(npc: EntityNPC) {
  // We remove fear from all enemies
  if (npc.HasEntityFlags(EntityFlag.FLAG_FEAR)) {
    npc.ClearEntityFlags(EntityFlag.FLAG_FEAR);
  }
}

// EntityFlag.FLAG_FRIENDLY (1 << 29)
function fadeFriendly(npc: EntityNPC) {
  // Fade the charmed enemies so that it is easier to see everything
  // This needs to be applied on every frame because enemies can be unfaded occasionally
  if (npc.HasEntityFlags(EntityFlag.FLAG_FRIENDLY)) {
    fade(npc);
  }
}

export function fade(entity: Entity): void {
  const color = entity.GetColor();
  const fadeAmount = 0.25;
  const newColor = Color(color.R, color.G, color.B, fadeAmount, 0, 0, 0);
  // RO, GO, && BO are float values, but the Color constructor only wants integers
  // So, se 0 for these values instead of the existing ones
  entity.SetColor(newColor, 0, 0, true, true);
}
