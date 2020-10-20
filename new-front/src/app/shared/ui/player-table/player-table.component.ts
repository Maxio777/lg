import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {PlayerClient} from '@models/interfaces';
import {INDICATORS} from '@assets/constants/player-table.config';

@Component({
  selector: 'lg-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerTableComponent {
  @Input() players: PlayerClient[] = [];
  search = '';
  slice = 30;
  isAppearance = false;
  indicators = INDICATORS;

  getPercent(player: PlayerClient, item: 'goalsCount' | 'assistsCount' | 'goalsAssists' ): number {
    if (player && player.gamesCount && player[item]) {
      return player.gamesCount / Number(player[item]);
    }
    return 0;
  }

  more(): void {
    this.isAppearance = true;
    this.slice += 20;
  }

}
