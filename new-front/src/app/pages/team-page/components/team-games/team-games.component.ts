import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {GameLG} from '@models/game/game';


@Component({
  selector: 'lg-team-games',
  templateUrl: './team-games.component.html',
  styleUrls: ['./team-games.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamGamesComponent {
  @Input() games: GameLG[] | undefined;
}
