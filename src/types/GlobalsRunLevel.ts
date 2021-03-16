// Per-level variables
export default class GlobalsRunLevel {
  stage: int;
  stageType: int;
  stageFrame: int;
  doubleItems = false;
  usedDiceRoom = false;

  constructor(stage: int, stageType: int, stageFrame: int) {
    this.stage = stage;
    this.stageType = stageType;
    this.stageFrame = stageFrame;
  }
}
