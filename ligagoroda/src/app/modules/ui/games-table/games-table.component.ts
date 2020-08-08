import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {GameLG} from '../../../models/game';
import {getColor} from '../../../core/get-color';


@Component({
  selector: 'app-games-table',
  templateUrl: './games-table.component.html',
  styleUrls: ['./games-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamesTableComponent {
  gamesFilter = '';
  filterSrt = [
    {name: 'ВСЕ', str: ''},
    {name: 'СЫГРАННЫЕ', str: 'completed'},
    {name: 'ПРЕДСТОЯЩИЕ', str: 'notCompleted'},
  ];
  @Input() games: GameLG[] = [];
  getColor = getColor;

  get displayGames() {
    return this.games.filter(g => this.filterGames(g));
  }

  filterGames(g: GameLG) {
    return this.gamesFilter
      ? this.gamesFilter === 'completed' ? g.completed : !g.completed
      : true;
  }

  setGamesFilter(gamesFilter: '' | 'completed' | 'notCompleted') {
    this.gamesFilter = gamesFilter;
  }

}
