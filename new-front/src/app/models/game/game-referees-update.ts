export class GameRefereesUpdate {
  referees: string[];

  constructor(lineups) {
    this.referees = lineups.map(player => player._id);
  }

  static fromJs(referees): GameRefereesUpdate | [] {
    if (referees?.length) {
      return new GameRefereesUpdate(referees);
    }
    return {referees: []};
  }
}
