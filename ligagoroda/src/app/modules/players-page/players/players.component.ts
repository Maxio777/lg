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

  constructor(public clientDataService: ClientDataService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.subs.add(this.clientDataService.getPlayers$().subscribe(players => {
      this.players = players;
      this.cd.detectChanges();
    }));
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
