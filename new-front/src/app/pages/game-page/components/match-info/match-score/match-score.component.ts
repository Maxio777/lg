import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {Game} from '@models/game/game';
import {getColor} from '@core/get-color';

@Component({
  selector: 'lg-match-score',
  templateUrl: './match-score.component.html',
  styleUrls: ['./match-score.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchScoreComponent {
  @Input() game: Game | undefined;
  getColor = getColor;


}
