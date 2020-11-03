import {Component, OnInit, ChangeDetectionStrategy, OnDestroy, Input, ChangeDetectorRef} from '@angular/core';
import {PlayerClient} from '@models/interfaces';
import {PLAYER_MENU} from '@assets/constants/player-menu';
import {Subscription} from 'rxjs';
import {ClientDataService} from '@core/client-data-service/client-data.service';
import {sortBy} from 'lodash';


@Component({
  selector: 'lg-side-players',
  templateUrl: './side-players.component.html',
  styleUrls: ['./side-players.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidePlayersComponent implements OnInit, OnDestroy {
  @Input() isShow = false;

  public players: PlayerClient[] | undefined;
  public currentVal: 'goalsCount' | 'assistsCount' | 'goalsAssists' | 'yellow' | 'red' = 'goalsCount';
  public playersMenu = PLAYER_MENU;
  private subs: Subscription = new Subscription();
  isLoad = false;

  constructor(
    public clientDataService: ClientDataService,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.getPlayers();
  }

  private initTable(players: PlayerClient[]): void {
    this.players = players;
    this.changeActive('goalsCount');
    this.cd.detectChanges();
  }

  private getPlayers(): void {
    this.subs.add(this.clientDataService.getPlayers$().subscribe(players => {
      this.initTable(players);
    }));
  }

  public changeActive(val: any): void {
    this.currentVal = val;
    this.players = sortBy(this.players, val, 'gamesCount').reverse();
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
