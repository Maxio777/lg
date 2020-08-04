import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {ClientDataService} from '../../client/services/client-data/client-data.service';
import {GameLG} from '../../../models/game';
import {getColor} from '../../../core/get-color';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-games-page',
  templateUrl: './games-page.component.html',
  styleUrls: ['./games-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamesPageComponent implements OnInit, OnDestroy {
  subs = new Subscription();
  games: GameLG[] = [];
  search = '';
  filterSrt = [
    {name: 'ВСЕ', str: ''},
    {name: 'СЫГРАННЫЕ', str: 'completed'},
    {name: 'ПРЕДСТОЯЩИЕ', str: 'notCompleted'},
  ];
  gamesFilter = '';
  getColor = getColor;

  constructor(
    public clientDataService: ClientDataService,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.subs.add(this.clientDataService.getGames$().subscribe(games => {
      this.games = games;
      this.cd.detectChanges();
    }));
  }

  _search(g: GameLG): boolean {
    return this.search
      ? g.home.name.toLowerCase().includes(this.search.toLowerCase()) || g.guest.name.toLowerCase().includes(this.search.toLowerCase())
      : true;
  }

  get displayGames() {
    return this.games.filter(g => this._search(g) && this.filterGames(g));
  }

  filterGames(g: GameLG) {
    return this.gamesFilter
      ? this.gamesFilter === 'completed' ? g.completed : !g.completed
      : true;
  }

  setGamesFilter(gamesFilter: '' | 'completed' | 'notCompleted') {
    this.gamesFilter = gamesFilter;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
