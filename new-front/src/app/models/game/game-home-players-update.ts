export class GameHomePlayersUpdate {
  homePlayers: string[];

  constructor(lineups) {
    this.homePlayers = lineups.map(player => player._id);
  }

  static fromJs(homePlayers): GameHomePlayersUpdate | [] {
    if (homePlayers?.length) {
      return new GameHomePlayersUpdate(homePlayers);
    }
    return {homePlayers: []};
  }

}
