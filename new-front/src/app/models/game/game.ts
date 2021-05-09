import {PlayerClient, Referee, TeamLG, Tournament} from '../interfaces';
import {ManagerLG} from '../manager';
import {EventModel} from '@models/events/event-model';

export class Game {
  _id: string;
  tournament: Tournament;
  home: TeamLG;
  guest: TeamLG;
  homeGoal: number;
  guestGoal: number;
  events: EventModel[];
  homePlayers: PlayerClient[];
  guestPlayers: PlayerClient[];
  homeManagers: ManagerLG[];
  guestManagers: ManagerLG[];
  referees: Referee[];
  date: Date;
  tour: number;
  completed: boolean;

  constructor(game) {
    this._id = game._id;
    this.tournament = game.tournament;
    this.home = game.home;
    this.guest = game.guest;
    this.tour = game.tour;
    this.date = game.date;
    this.homePlayers = game.homePlayers;
    this.guestPlayers = game.guestPlayers;
    this.homeManagers = game.homeManagers;
    this.guestManagers = game.guestManagers;
    this.referees = game.referees;
    this.events = game.events;
    this.guestGoal = game.guestGoal;
    this.homeGoal = game.homeGoal;
    this.completed = game.completed;
  }

  static fromJs(game): Game {
    if (game) {
      return new Game(game);
    }
    return null;
  }

  static fromJsArr(games): Game {
    if (games && games.length) {
      return games.map(game => Game.fromJs(game));
    }
    return null;
  }
}
