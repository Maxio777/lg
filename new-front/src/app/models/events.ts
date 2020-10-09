import { PlayerAdmin } from './interfaces';

export interface EventLG {
  _id: string;
  type: string;
  minute: number;
  owner: PlayerAdmin;
  assistant: PlayerAdmin;
  game: string;
  tournament: string;
}
