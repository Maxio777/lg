export class GameGuestPlayersUpdate {
  guestPlayers: string[];

  constructor(lineups) {
    this.guestPlayers = lineups.map(player => player._id);
  }

  static fromJs(guestPlayers): GameGuestPlayersUpdate | [] {
    if (guestPlayers?.length) {
      return new GameGuestPlayersUpdate(guestPlayers);
    }
    return {guestPlayers: []};
  }

}
