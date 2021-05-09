import {Injectable} from '@angular/core';
import {Game} from '@models/game/game';
import {PlayerClient} from '@models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class GamePageService {

  isHomeOrGuestPlayer(game: Game, isHome: boolean, id: string): boolean {
    let players: PlayerClient[] = [];
    if (game) {
      players = isHome ? game.homePlayers : game.guestPlayers;
      return !!players.find(p => p._id === id);
    }
    return false;
  }
}
