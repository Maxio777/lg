import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { sortBy } from 'lodash';
import {PlayerClient, TournamentLG} from '../../../models/interfaces';
import { Subscription } from 'rxjs';
import { ClientDataService } from '../services/client-data/client-data.service';


@Component({
  selector: 'app-stat-players',
  templateUrl: './stat-players.component.html',
  styleUrls: ['./stat-players.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatPlayersComponent implements OnInit, OnDestroy {
  @Input() isMainPage: boolean = false;

  players: PlayerClient[] | undefined;
  currentVal: 'goalsCount' | 'assistsCount' | 'goalsAssists' | 'yellow' | 'red' = 'goalsCount';
  currentTournament: TournamentLG | null = null;
  subs: Subscription = new Subscription();

  goToUrl = (id: string) => this.router.navigate(['player/' + id]);

  constructor(
    private router: Router,
    private clientDataService: ClientDataService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getCurrentTournament();
    this.getPlayers();
  }

  initTable(players: PlayerClient[]) {
    this.players = players;
    this.changeCurrentVal('goalsCount');
    this.cd.detectChanges();
  }

  getCurrentTournament() {
    this.subs.add(this.clientDataService.getTournament$().subscribe(tournament => {
      this.currentTournament = tournament;
      this.cd.detectChanges();
    }));
  }

  getPlayers() {
    this.subs.add(this.clientDataService.getPlayers$().subscribe(players => {
      this.initTable(players);
    }));
  }

  changeCurrentVal(val: any): void {
    this.currentVal = val;
    this.players = sortBy(this.players, val, 'gamesCount').reverse();
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
