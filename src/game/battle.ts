import { IFighterInfo } from "./fighterInfo.js";

export interface IBattle {
  get fighters(): IFighterInfo[];
  get currentRound(): number;
  get roundTime(): number;
  get roundScore(): number[];
  get result(): unknown;
}
