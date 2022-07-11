import { PillColor, PillEffect } from "isaac-typescript-definitions";

export default interface GlobalsRunPills {
  // The randomly selected pill effects for this run.
  effects: Map<PillColor, PillEffect>;

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
