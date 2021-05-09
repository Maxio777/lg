export class GameInfoUpdate {
  homeGoal: number;
  guestGoal: number;
  date: string;
  tour: number;
  completed: boolean;

  constructor(game) {
    console.log(game.date);
    this.homeGoal = game.homeGoal;
    this.guestGoal = game.guestGoal;
    this.date = game.date;
    this.tour = game.tour;
    this.completed = game.completed;
  }

  static fromJs(game): GameInfoUpdate {
    if (game) {
      return new GameInfoUpdate(game);
    }
    return null;
  }

}
