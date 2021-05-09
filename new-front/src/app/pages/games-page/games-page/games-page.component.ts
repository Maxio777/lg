import {Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {Subscription} from 'rxjs';
import {Game} from '@models/game/game';
import {ClientDataService} from '@core/services/client-data-service/client-data.service';

@Component({
  selector: 'lg-games-page',
  templateUrl: './games-page.component.html',
  styleUrls: ['./games-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamesPageComponent implements OnInit, OnDestroy {
  subs = new Subscription();
  search = '';
  games: Game[] = [];
  isLoad = false;


  constructor(
    public clientDataService: ClientDataService,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.subs.add(this.clientDataService.getGames$().subscribe(games => {
      this.games = games;
      this.cd.detectChanges();
    }));
  }

  _search(g: Game): boolean {
    return this.search
      ? g.home.name.toLowerCase().includes(this.search.toLowerCase()) || g.guest.name.toLowerCase().includes(this.search.toLowerCase())
      : true;
  }

  get displayGames(): Game[] {
    return this.games.filter(g => this._search(g));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
