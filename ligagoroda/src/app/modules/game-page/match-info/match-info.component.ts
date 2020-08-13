import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {GameLG} from '../../../models/game';

@Component({
  selector: 'app-match-info',
  templateUrl: './match-info.component.html',
  styleUrls: ['./match-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchInfoComponent {
  @Input() game: GameLG | undefined;
}
