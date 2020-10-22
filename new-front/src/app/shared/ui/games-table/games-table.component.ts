import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {GameLG} from '@models/game';
import {getColor} from '@core/get-color';

@Component({
  selector: 'lg-games-table',
  templateUrl: './games-table.component.html',
  styleUrls: ['./games-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamesTableComponent {
  @Input() games: GameLG[] = [];
  gamesFilter = '';
  filterSrt = [
    {name: 'ВСЕ', str: ''},
    {name: 'СЫГРАННЫЕ', str: 'completed'},
    {name: 'ПРЕДСТОЯЩИЕ', str: 'notCompleted'},
  ];
  getColor = getColor;

  get displayGames(): GameLG[] {
    return this.games?.filter(g => this.filterGames(g));
  }

  filterGames(g: GameLG): boolean {
    return this.gamesFilter
      ? this.gamesFilter === 'completed' ? g.completed : !g.completed
      : true;
  }

  setGamesFilter(gamesFilter: '' | 'completed' | 'notCompleted'): void {
    this.gamesFilter = gamesFilter;
  }

}
