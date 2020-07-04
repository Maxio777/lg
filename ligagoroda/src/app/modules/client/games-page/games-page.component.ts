import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';
import {Router} from '@angular/router';
import {URLS} from '../../../core/urls';
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

  goToTeam(id: string) {
    this.router.navigate([URLS.team, id]);
  }

  getColor(game: GameLG, isHome: boolean) {
    let color = game.completed ? 'yellow' : 'grey';
    if (game.completed) {
      if (game.homeGoal > game.guestGoal) {
        color = isHome ? 'green' : 'red';
      }
      if (game.homeGoal < game.guestGoal) {
        color = isHome ? 'red' : 'green';
      }
    }
    return color;
  }

}
