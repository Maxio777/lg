import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {sortBy} from 'lodash';
import {PlayerClient} from '../../../../../models/interfaces';
import {Subscription} from 'rxjs';
import {ClientDataService} from '../../../services/client-data/client-data.service';
import {PLAYER_MENU} from '../../../../../assets/constants/player-menu';


@Component({
  selector: 'app-stat-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersComponent implements OnInit, OnDestroy {
  @Input() isShow: boolean = false;

  public players: PlayerClient[] | undefined;
  public currentVal: 'goalsCount' | 'assistsCount' | 'goalsAssists' | 'yellow' | 'red' = 'goalsCount';
  public playersMenu = PLAYER_MENU;
  private subs: Subscription = new Subscription();

  constructor(
    public clientDataService: ClientDataService,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.getPlayers();
  }

  private initTable(players: PlayerClient[]) {
    this.players = players;
    this.changeActive('goalsCount');
    this.cd.detectChanges();
  }

  private getPlayers() {
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
