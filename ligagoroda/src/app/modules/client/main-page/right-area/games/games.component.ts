import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {ClientDataService} from '../../../services/client-data/client-data.service';
import {GameLG} from '../../../../../models/game';
import {getColor} from '../../../../../core/urls';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamesComponent {
  @Input() isShow: boolean = true;
  filterSrt = [
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
