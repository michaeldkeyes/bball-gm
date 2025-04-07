import { Player } from "./player.interface";
import { Stats } from "./Stats";

export interface Team {
  id: number;
  name: string;
  city: string;
  players: Player[];
  stats?: Stats;
}
