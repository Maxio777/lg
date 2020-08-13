import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {PlayerClient} from '../../../models/interfaces';
import {INDICATORS} from '../../../assets/constants/player-table.config';

@Component({
  selector: 'app-player-statistics',
  templateUrl: './player-statistics.component.html',
  styleUrls: ['./player-statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerStatisticsComponent {
  @Input() player: PlayerClient | undefined;

  indicators = INDICATORS;
}
