import g from "../globals";

export function main(player: EntityPlayer): void {
  // We don't care if this is a co-op baby
  if (player.Variant !== PlayerVariant.PLAYER) {
    return;
  }

  // Cache the player object so that we don't have to repeatedly call "Isaac.GetPlayer(0)"
  g.p = player;
}
