import { PillEffectCustom } from "./enums";

export default interface GlobalsRunPills {
  // The randomly selected pill effects for this run
  effects: Map<PillColor, PillEffect | PillEffectCustom>;

  // Stat up counters
  damageUp: int;
  tearDelayDown: int;

  // Timers
  superSadness: int;
  invincibility: int;
  reallyBadGas: int;
  aether: int;
  aetherAngle: int;
  wallsHaveEyes: int;
  wallsHaveEyesShooting: boolean;
  bladderInfection: int;
  scorchedEarth: int;
  familiarFrenzy: int;
}
