import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {Router} from '@angular/router';
import {sortBy} from 'lodash';
import {PlayerClient, TournamentLG} from '../../../models/interfaces';
import {Subscription} from 'rxjs';
import {ClientDataService} from '../services/client-data/client-data.service';
import {PLAYER_MENU} from '../../../assets/constants/player-menu';


@Component({
  selector: 'app-stat-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersComponent implements OnInit, OnDestroy {
  @Input() isMainPage: boolean = false;

  public players: PlayerClient[] | undefined;
  public currentVal: 'goalsCount' | 'assistsCount' | 'goalsAssists' | 'yellow' | 'red' = 'goalsCount';
  public currentTournament: TournamentLG | null = null;
  public playersMenu = PLAYER_MENU;
  private subs: Subscription = new Subscription();

  goToUrl = (id: string) => this.router.navigate(['player', id]);

  constructor(
    private router: Router,
    private clientDataService: ClientDataService,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.getCurrentTournament();
    this.getPlayers();
  }

  private initTable(players: PlayerClient[]) {
    this.players = players;
    this.changeActive('goalsCount');
    this.cd.detectChanges();
  }

  private getCurrentTournament() {
    this.subs.add(this.clientDataService.getTournament$().subscribe(tournament => {
      this.currentTournament = tournament;
      this.cd.detectChanges();
    }));
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
