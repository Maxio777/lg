import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {Game} from '@models/game/game';
import {GamePageService} from '../../game-page-service/game-page.service';
import {EventLG} from '@models/events';
import {EventTypes} from '@models/events/enteties/event-types';

@Component({
  selector: 'lg-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsComponent {
  @Input() game: Game | undefined;
  @Input() title = '';
  @Input() isGoals: boolean;
  @Input() isAdmin = false;

  private _goalsTypes = [
    EventTypes.Goal,
    EventTypes.PenaltyGoal,
    EventTypes.AutoGoal,
  ];

  private _punishmentsTypes = [
    EventTypes.Yellow,
    EventTypes.YellowRed,
    EventTypes.Red,
  ];

  constructor(public gamePageService: GamePageService) {
  }

  get events(): EventLG[] {
    return this.game?.events?.filter(e => {
      return this.isGoals
        ? this._goalsTypes.includes(e?.type)
        : this._punishmentsTypes.includes(e?.type);
    }).sort((a, b) => a.minute - b.minute);
  }
}
