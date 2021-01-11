export class GameCreate {
  tournament: string;
  home: string;
  guest: string;
  tour: string | number;
  date: Date | null;
  homePlayers: string[];
  guestPlayers: string[];
  homeManagers: string[];
  guestManagers: string[];
  referees: string[];
  events: string[];
  guestGoal: number | null;
  homeGoal: number | null;
  completed: boolean;

  constructor(game) {
    this.tournament = game.tournament;
    this.home = game.home;
    this.guest = game.guest;
    this.tour = game.tour;
    this.date = game.date ? new Date(game.date) : null;
    this.homePlayers = game.homePlayers || [];
    this.guestPlayers = game.guestPlayers || [];
    this.homeManagers = game.homeManagers || [];
    this.guestManagers = game.guestManagers || [];
    this.referees = game.referees || [];
    this.events = game.events || [];
    this.guestGoal = game.guestGoal || null;
    this.homeGoal = game.homeGoal || null;
    this.completed = game.completed || false;
  }

  static fromJS(game): GameCreate {
    if (game) {
      return new GameCreate(game);
    }
    return null;
  }
}
