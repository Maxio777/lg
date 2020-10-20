import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {PlayerClient} from '@models/interfaces';

@Component({
  selector: 'lg-team-players',
  templateUrl: './team-players.component.html',
  styleUrls: ['./team-players.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamPlayersComponent {
  @Input() players: PlayerClient[] | undefined;
}
