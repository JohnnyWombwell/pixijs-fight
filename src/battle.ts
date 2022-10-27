import { FightSimulation } from "./fightSimulation.js";
import { IBattle } from "./game/battle.js";
import { IFighterInfo } from "./game/fighterInfo.js";

export class Battle implements IBattle {
  private readonly _fightSimulation: FightSimulation;

  public constructor(fightSimulation: FightSimulation) {
    this._fightSimulation = fightSimulation;
  }

  public get fighters(): IFighterInfo[] {
    return this._fightSimulation.fighterInfo;
  }

  public get currentRound(): number {
    return 1;
  }

  public get roundTime(): number {
    return this._fightSimulation.battleTime;
  }

  public get roundScore(): number[] {
    return [0, 0];
  }

  public get result(): unknown {
    return null;
  }
}