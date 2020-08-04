import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';
import {getColor} from '../../../core/get-color';
import {ClientDataService} from '../services/client-data/client-data.service';
import {GameLG} from '../../../models/game';


@Component({
  selector: 'app-games-page',
  templateUrl: './games-page.component.html',
  styleUrls: ['./games-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class GamesPageComponent {
  filterSrt = [
    // {name: 'ВСЕ', str: ''}, // TODO ПОНАДОБИТСЯ НА ОТДЕЛЬНОЙ СТРАНИЦЕ
    {name: 'СЫГРАННЫЕ', str: 'completed'},
    {name: 'ПРЕДСТОЯЩИЕ', str: 'notCompleted'},
  ];
  gamesFilter = 'completed';
  getColor = getColor;

  constructor(public clientDataService: ClientDataService) {
  }

  filterGames(games: GameLG[]) {
    return this.gamesFilter ?
      games.filter(g => this.gamesFilter === 'completed' ? g.completed : !g.completed)
      : games;
  }

  setGamesFilter(gamesFilter: '' | 'completed' | 'notCompleted') {
    this.gamesFilter = gamesFilter;
  }

}
