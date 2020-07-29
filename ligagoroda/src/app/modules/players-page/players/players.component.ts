import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {ClientDataService} from '../../client/services/client-data/client-data.service';
import {Subscription} from 'rxjs';
import {PlayerClient} from '../../../models/interfaces';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersComponent implements OnInit, OnDestroy {
  subs = new Subscription();
  players: PlayerClient[] = [];
  search = '';
  slice = 30;
  isAppearance = false;

  constructor(public clientDataService: ClientDataService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.subs.add(this.clientDataService.getPlayers$().subscribe(players => {
      this.players = players;
      this.cd.detectChanges();
    }));
  }

  getPercent(player: PlayerClient, item: 'goalsCount' | 'assistsCount' | 'goalsAssists' ): number {
    if (player && player.gamesCount && player[item]) {
      return player.gamesCount / Number(player[item]);
    }
    return 0;
  }

  more() {
    this.isAppearance = true;
    this.slice += 20;
  }

  _search(players: PlayerClient[]): PlayerClient[] {
    return this.search
      ? players.filter(p => p.lastName.toLowerCase().includes(this.search.toLowerCase())
                        || p.firstName.toLowerCase().includes(this.search.toLowerCase())
               || (p.middleName || '').toLowerCase().includes(this.search.toLowerCase())
      )
      : this.players;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
