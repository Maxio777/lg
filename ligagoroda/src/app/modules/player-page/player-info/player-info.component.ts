import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {PlayerClient} from '../../../models/interfaces';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerInfoComponent {
  @Input() player: PlayerClient | undefined;

}
