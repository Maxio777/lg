import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {GameLG} from '@models/game';

@Component({
  selector: 'lg-tour-date-completed',
  templateUrl: './tour-date-completed.component.html',
  styleUrls: ['./tour-date-completed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TourDateCompletedComponent {
  @Input() game: GameLG | undefined;
}
