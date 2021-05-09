import { PlayerAdmin } from './interfaces';

export interface EventLG {
  _id: string;
  type: number;
  minute: number;
  owner: PlayerAdmin;
  assistant: PlayerAdmin;
  game: string;
  tournament: string;
}
