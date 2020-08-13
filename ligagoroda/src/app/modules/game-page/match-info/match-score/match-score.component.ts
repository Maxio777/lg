import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {GameLG} from '../../../../models/game';
import {getColor} from '../../../../core/get-color';


@Component({
  selector: 'app-match-score',
  templateUrl: './match-score.component.html',
  styleUrls: ['./match-score.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchScoreComponent implements OnInit {
  @Input() game: GameLG | undefined;
  getColor = getColor;

  constructor() { }

  ngOnInit() {
  }

}
