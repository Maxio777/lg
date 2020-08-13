import {Injectable} from '@angular/core';
import {PlayerClient} from '../../models/interfaces';
import {GameLG} from '../../models/game';

@Injectable()
export class GamePageService {

  isHomeOrGuestPlayer(game: GameLG, isHome: boolean, id: string): boolean {
    let players: PlayerClient[] = [];
    if (game) {
      players = isHome ? game.homePlayers : game.guestPlayers;
      return !!players.find(p => p._id === id);
    }
    return false;
  }
}
