import type { PredictStas } from "./predictStats";

export interface ApiResponse {
  data: Data;
  error?: string;
}

export interface Data {
    jornada: number;
    player_id: number;
    player_name: string;
    stats: PredictStas;
    note?: string;
}
