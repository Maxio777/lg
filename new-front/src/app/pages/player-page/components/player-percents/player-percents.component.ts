import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {PlayerClient} from '@models/interfaces';

@Component({
  selector: 'lg-player-percents',
  templateUrl: './player-percents.component.html',
  styleUrls: ['./player-percents.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerPercentsComponent {
  @Input() player: PlayerClient | undefined;

  getPercent(player: PlayerClient | undefined, item: string): number {
    if (player && player.gamesCount && player[item]) {
      return Number(player[item]) / Number(player.gamesCount);
    }
    return 0;
  }
}
