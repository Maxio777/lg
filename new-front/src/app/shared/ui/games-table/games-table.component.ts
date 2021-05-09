import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {Game} from '@models/game/game';
import {getColor} from '@core/get-color';

@Component({
  selector: 'lg-games-table',
  templateUrl: './games-table.component.html',
  styleUrls: ['./games-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamesTableComponent {
  @Input() games: Game[] = [];
  gamesFilter = '';
  filterSrt = [
    {name: 'ВСЕ', str: ''},
    {name: 'СЫГРАННЫЕ', str: 'completed'},
    {name: 'ПРЕДСТОЯЩИЕ', str: 'notCompleted'},
  ];
  getColor = getColor;

  get displayGames(): Game[] {
    return this.games?.filter(g => this.filterGames(g));
  }

  filterGames(g: Game): boolean {
    return this.gamesFilter
      ? this.gamesFilter === 'completed' ? g.completed : !g.completed
      : true;
  }

  setGamesFilter(gamesFilter: '' | 'completed' | 'notCompleted'): void {
    this.gamesFilter = gamesFilter;
  }

}
