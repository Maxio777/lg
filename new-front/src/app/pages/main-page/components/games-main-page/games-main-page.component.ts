import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ClientDataService} from '@core/services/client-data-service/client-data.service';
import {GameLG} from '@models/game/game';
import {getColor} from '@core/get-color';

@Component({
  selector: 'lg-games-main-page',
  templateUrl: './games-main-page.component.html',
  styleUrls: ['./games-main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamesMainPageComponent {
  filterSrt = [
    // {name: 'ВСЕ', str: ''}, // TODO ПОНАДОБИТСЯ НА ОТДЕЛЬНОЙ СТРАНИЦЕ
    {name: 'СЫГРАННЫЕ', str: 'completed'},
    {name: 'ПРЕДСТОЯЩИЕ', str: 'notCompleted'},
  ];
  gamesFilter = 'completed';
  getColor = getColor;
  isLoad = false;

  constructor(public clientDataService: ClientDataService) {
  }

  filterGames(games: GameLG[]): GameLG[] {
    return this.gamesFilter ?
      games.filter(g => this.gamesFilter === 'completed' ? g.completed : !g.completed)
      : games;
  }

  setGamesFilter(gamesFilter: '' | 'completed' | 'notCompleted'): void {
    this.gamesFilter = gamesFilter;
  }

  changeLoadStatus(): void {
    this.isLoad = true;
  }

}
