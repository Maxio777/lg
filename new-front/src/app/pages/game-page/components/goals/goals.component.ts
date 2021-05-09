import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {Game} from '@models/game/game';
import {EventLG} from '@models/events';
import {GamePageService} from '../../game-page-service/game-page.service';
import {EventTypes} from '@models/events/enteties/event-types';

@Component({
  selector: 'lg-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoalsComponent {
  @Input() game: Game | undefined;
  private _eventTypes = EventTypes;

  constructor(public gamePageService: GamePageService) { }

  goals(): EventLG[] {
    return this.game?.events
      ? this.game.events.filter(e => [
        this._eventTypes.Goal,
        this._eventTypes.PenaltyGoal,
        this._eventTypes.AutoGoal,
      ].includes(e.type))
      : [];
  }

}
