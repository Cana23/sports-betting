import type { Positions } from "./positions";

export interface Player {
  id: number;
  name: string;
  position: Positions;
  age: number;
  image: string;
  top?: string;
  left?: string;
}
