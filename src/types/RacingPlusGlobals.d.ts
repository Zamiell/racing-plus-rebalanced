import { CollectibleType } from "isaac-typescript-definitions";

declare global {
  const RacingPlusGlobals: {
    run: {
      bossCommand: boolean;
      extraIncubus: boolean;
      lastDDLevel: int;
      rechargeItemFrame: int;
      restart: boolean;
      schoolbag: {
        item: CollectibleType;
      };
      streakFrame: int;
      streakIgnore: boolean;
      streakText: string;
    };
  };
}
