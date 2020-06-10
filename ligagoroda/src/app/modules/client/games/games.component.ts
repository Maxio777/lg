import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';
import {Router} from '@angular/router';
import {URLS} from '../../../core/urls';
import {ClientDataService} from '../services/client-data/client-data.service';
import {GameLG} from '../../../models/game';


@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class GamesComponent {
  filterSrt = [
    {name: 'ВСЕ', str: ''},
    {name: 'СЫГРАННЫЕ', str: 'completed'},
    {name: 'ПРЕДСТОЯЩИЕ', str: 'notCompleted'},
  ];
  gamesFilter = '';

  constructor(private router: Router, public clientDataService: ClientDataService) {
  }

  filterGames(games: GameLG[]) {
    return this.gamesFilter ?
      games.filter(g => this.gamesFilter === 'completed' ? g.completed : !g.completed)
      : games;
  }

  setGamesFilter(gamesFilter: '' | 'completed' | 'notCompleted') {
    this.gamesFilter = gamesFilter;
  }

  goToGame(id: string) {
    this.router.navigate([URLS.game + id]);
  }

}
