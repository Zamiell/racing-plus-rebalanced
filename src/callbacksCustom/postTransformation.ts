import { PlayerForm } from "isaac-typescript-definitions";
import { ModCallbackCustom, ModUpgraded } from "isaacscript-common";
import { killIfNoHealth, setHealthFromLastFrame } from "../misc";

export function init(mod: ModUpgraded): void {
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_TRANSFORMATION,
    leviathan,
    PlayerForm.LEVIATHAN,
  );
}

function leviathan(
  _player: EntityPlayer,
  _playerForm: PlayerForm,
  hasForm: boolean,
) {
  if (hasForm) {
    setHealthFromLastFrame();
    killIfNoHealth();
  }
}
