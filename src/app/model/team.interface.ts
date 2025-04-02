import { Player } from "./player.interface";
import { Stats } from "./Stats";

export interface Team {
  name: string;
  city: string;
  players: Player[];
  stats?: Stats;
}
