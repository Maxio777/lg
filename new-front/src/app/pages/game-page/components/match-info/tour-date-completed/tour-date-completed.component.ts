import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {Game} from '@models/game/game';

@Component({
  selector: 'lg-tour-date-completed',
  templateUrl: './tour-date-completed.component.html',
  styleUrls: ['./tour-date-completed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TourDateCompletedComponent {
  @Input() game: Game | undefined;
}
