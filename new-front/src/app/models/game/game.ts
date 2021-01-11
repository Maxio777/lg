import {PlayerClient, Referee, TeamLG, Tournament} from '../interfaces';
import {EventLG} from '../events';
import {ManagerLG} from '../manager';

export interface GameLG {
  _id: string;
  tournament: Tournament;
  home: TeamLG;
  guest: TeamLG;
  homeGoal: number;
  guestGoal: number;
  events: EventLG[];
  homePlayers: PlayerClient[];
  guestPlayers: PlayerClient[];
  homeManagers: ManagerLG[];
  guestManagers: ManagerLG[];
  referees: Referee[];
  date: string;
  tour: number;
  completed: boolean;
  selected?: boolean;
}
