import type { Statistics } from "./statistics";

export interface PredictStas {
  pase: Pase;
  tiro: Tiro;
  regate: Regate;
  defensa: Defensa;
  other?: null;

  // min: number;
  // Gls: number;
  // Ast: number;
  // Pk: number;
  // Pkatt: number;
  // Sh: number;
  // Sot: number;
  // Crdy: number;
  // Crdr: number;
  // Touches: number;
  // Tkl: number;
  // Int: number;
  // Blocks: number;
  // Xg: number;
  // Npxg: number;
  // Xag: number;
  // Sca: number;
  // Gca: number;
  // Cmp: number;
  // Att: number;
  // Cmp_percent: number;
  // Prgp: number;
  // Carries: number;
  // Prgc: number;
  // Att_dribbles: number;
  // Succ: number;
}

interface Tiro {
  Gls: Statistics;
  Sh: Statistics;
  SoT: Statistics;
  xG: Statistics;
}

interface Pase {
  Att: Statistics;
  Cmp: Statistics;
  "Cmp%": Statistics;
  PrgP: Statistics;
}

interface Regate {
  "Att.1": Statistics;
  Carries: Statistics;
  PrgC: Statistics;
  Succ: Statistics;
}

interface Defensa {
  Blocks: Statistics;
  Int: Statistics;
  Tkl: Statistics;
}