import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {INDICATORS} from '@assets/constants/player-table.config';
import {PlayerClient} from '@models/interfaces';

@Component({
  selector: 'lg-player-statistics',
  templateUrl: './player-statistics.component.html',
  styleUrls: ['./player-statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerStatisticsComponent {
  @Input() player: PlayerClient | undefined;

  indicators = INDICATORS;
}
