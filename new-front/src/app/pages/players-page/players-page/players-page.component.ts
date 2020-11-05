import {Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {Subscription} from 'rxjs';
import {PlayerClient} from '@models/interfaces';
import {ClientDataService} from '@core/client-data-service/client-data.service';

@Component({
  selector: 'lg-players-page',
  templateUrl: './players-page.component.html',
  styleUrls: ['./players-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersPageComponent implements OnInit, OnDestroy {
  subs = new Subscription();
  players: PlayerClient[] = [];
  search = '';
  isLoad = false;

  constructor(public clientDataService: ClientDataService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
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

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
