import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {ClientDataService} from '@core/services/client-data-service/client-data.service';
import {GameLG} from '@models/game/game';
import {getColor} from '@core/get-color';

@Component({
  selector: 'lg-side-games',
  templateUrl: './side-games.component.html',
  styleUrls: ['./side-games.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideGamesComponent {
  @Input() isShow = true;
  filterSrt = [
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

}
