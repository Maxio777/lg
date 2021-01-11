import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {GameLG} from '@models/game/game';

@Component({
  selector: 'lg-match-info',
  templateUrl: './match-info.component.html',
  styleUrls: ['./match-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchInfoComponent {
  @Input() game: GameLG | undefined;
}
