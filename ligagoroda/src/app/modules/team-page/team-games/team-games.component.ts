import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {GameLG} from '../../../models/game';

@Component({
  selector: 'app-team-games',
  templateUrl: './team-games.component.html',
  styleUrls: ['./team-games.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamGamesComponent implements OnInit {
  @Input() games: GameLG[] | undefined;

  constructor() { }

  ngOnInit() {
  }

}
