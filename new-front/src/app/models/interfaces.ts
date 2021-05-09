import {ManagerLG} from './manager';
import {Game} from '@models/game/game';

export interface Goal {
  id: number;
  player: Player;
  assistant: Player;
  is_home: boolean;
  time: number;
  type_goal: string;
}

export interface Team {
  id: number;
  team_image: string;
  team_name: string;
}

export interface TeamLG {
  _id: string;
  name: string;
  players: PlayerAdmin[];
  games: Game[];
  managers: ManagerLG[];
  img: string;
  isLoading?: boolean;
  selected?: boolean;
}

export interface PlayerClient {
  _id: string;
  firstName: string;
  lastName: string;
  number: number;
  middleName?: string;
  img?: string;
  birthday?: string;
  gamesCount?: number;
  goalsCount?: number;
  assistsCount?: number;
  yellow?: number;
  red?: number;
  goalsAssists?: number;
  autoGoals?: number;
  penalty?: number;
  yellowReds?: number;
  games?: Game[];
  teams?: { _id: string, name: string, img: string }[]; // команды конкретного турнира, обогащается на фронте
}

export interface PlayerAdmin {
  _id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  image?: string;
  birthday?: string;
  selected?: boolean;
}

export interface Player {
  id: number;
  first_name: string;
  last_name: string;
  image: string;
  number: number;
  gamesCount?: number;
  goalsCount?: number;
  assistsCount?: number;
  yellow?: number;
  red?: number;
  goalsAssists?: number;
  games?: Game[];
  selected?: boolean;
  middle_name?: string;
  date_of_birth?: string;
  team?: Team[];
  role?: string;
}

export interface Punishment {
  id: number;
  player: Player;
  is_home: boolean;
  time: number;
  type_punishment: string;
}

export interface Referee {
  _id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  dateOfBirth: string;
  image: string;
  selected?: boolean;
}

export interface TournamentLG {
  _id: string;
  name: string;
  dateStart: string;
  dateEnd: string;
  completed: boolean;
  format: string;
  selected?: boolean;
}

export interface Tournament {
  _id: string;
  name: string;
  dateStart: string;
  dateEnd: string;
  completed: boolean;
  format: string;
  selected?: boolean;
}

export interface FormConfig {
  controlName: string;
  controlState: string | boolean | number;
  validators: string[];
}




