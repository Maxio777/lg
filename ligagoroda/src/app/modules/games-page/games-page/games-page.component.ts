import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {ClientDataService} from '../../client/services/client-data/client-data.service';
import {GameLG} from '../../../models/game';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-games-page',
  templateUrl: './games-page.component.html',
  styleUrls: ['./games-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamesPageComponent implements OnInit, OnDestroy {
  subs = new Subscription();
  search = '';
  games: GameLG[] = [];


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
    return this.games.filter(g => this._search(g));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
