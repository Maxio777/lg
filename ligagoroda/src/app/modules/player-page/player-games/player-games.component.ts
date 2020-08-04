import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {PlayerClient} from '../../../models/interfaces';
import {getColor} from '../../../core/get-color';
import {GameLG} from '../../../models/game';


@Component({
  selector: 'app-player-games',
  templateUrl: './player-games.component.html',
  styleUrls: ['./player-games.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerGamesComponent {
  @Input() player: PlayerClient | undefined;

  getColor: Function = getColor;

  getEventCount(game: GameLG, id: string, type: string): number {
    return game.events.filter(e => e.type === type && e.owner._id === id).length;
  }

  getAssistCount(game: GameLG, id: string, type: string): number {
    return game.events.filter(e => e.type === type && e.assistant._id === id).length;
  }
}
