import {Component, ChangeDetectionStrategy, Input, ViewChild} from '@angular/core';
import {PlayerClient} from '@models/interfaces';
import {INDICATORS} from '@assets/constants/player-table.config';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'lg-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerTableComponent {
  @Input() players: PlayerClient[] = [];
  @Input() notLink = false;
  @Input() slice = 30;
  @ViewChild('helpRef') helpRef: any;
  search = '';
  isAppearance = false;
  indicators = INDICATORS;

  constructor(private dialog: MatDialog) {
  }

  getPercent(player: PlayerClient, item: 'goalsCount' | 'assistsCount' | 'goalsAssists' ): number {
    if (player && player.gamesCount && player[item]) {
      return Number(player[item] / player.gamesCount);
    }
    return 0;
  }

  more(): void {
    this.isAppearance = true;
    this.slice += 20;
  }

  public openDialog(): void {
    this.dialog.open(this.helpRef, { minWidth: '280px' });
  }

  public closeDialog(): void {
    this.dialog.closeAll();
  }

}
