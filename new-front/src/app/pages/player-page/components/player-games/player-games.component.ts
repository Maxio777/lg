import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {PlayerClient} from '@models/interfaces';
import {getColor} from '@core/get-color';
import {Game} from '@models/game/game';
import {EventTypes} from '@models/events/enteties/event-types';

@Component({
  selector: 'lg-player-games',
  templateUrl: './player-games.component.html',
  styleUrls: ['./player-games.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerGamesComponent {
  @Input() player: PlayerClient | undefined;
  eventTypes = EventTypes;

  getColor = getColor;

  getEventCount(game: Game, id: string, types: number[]): number {
    return game.events.filter(e => types.includes(e.type) && e.owner._id === id).length;
  }

  getAssistCount(game: Game, id: string, type: number): number {
    return game.events.filter(e => e.type === type && e?.assistant?._id === id).length;
  }
}
