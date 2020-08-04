import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {PlayerClient} from '../../../models/interfaces';

@Component({
  selector: 'app-player-games',
  templateUrl: './player-games.component.html',
  styleUrls: ['./player-games.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerGamesComponent {
  @Input() player: PlayerClient | undefined;
}
