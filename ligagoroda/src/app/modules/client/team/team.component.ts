import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PlayerClient, TeamLG } from '../../../models/interfaces';
import { ClientDataService } from '../services/client-data/client-data.service';
import { GameLG } from '../../../models/game';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  @Input() data: string[] = [];
  @Input() display: string[] = [];

  dataSource?: MatTableDataSource<PlayerClient[]>;
  dataSourceGames?: MatTableDataSource<GameLG[]> | null = null;
  displayedColumnsGames: string[] = ['date', 'home', 'score', 'guest', 'tour'];
  displayedColumns: string[] =
    ['id', 'photo', 'playerName', 'dateOfBirth', 'gamesCount', 'goalsCount', 'assistsCount', 'yellow', 'red'];

  team?: TeamLG | null = null;
  players: any = [];

  subs: Subscription = new Subscription;

  constructor(
    private route: ActivatedRoute,
    private clientDataService: ClientDataService,
    private router: Router,
    private cd: ChangeDetectorRef,
  ) { }


  ngOnInit() {
    this.getTeamDetail();
  }

  initTableGames() {
    if (this.team && this.team.games) {
      this.dataSourceGames = new MatTableDataSource<any>(this.team.games);
      this.dataSourceGames.sort = this.sort;
      this.dataSourceGames.paginator = this.paginator;
    }
  }

  initTable() {
    if (this.team && this.players) {
      this.dataSource = new MatTableDataSource<any>(this.players);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.cd.detectChanges();
    }
  }

  getTeamDetail() {
    this.route.params.subscribe((params: Params) => {

      const idTeam = params.id;

      this.subs.add(this.clientDataService.getIsInitAppData().subscribe(() => {

          this.team = this.clientDataService.teamsMap.get(idTeam);

          if (this.team) {
            this.team.games = this.clientDataService.getGames$().getValue()
              .filter(game => {
                if (this.team) {
                  return game.home._id === this.team._id || game.guest._id === this.team._id;
                }
                return false;
              });
            const players = [...this.team.players];
            this.players = players.map((id: any) => this.clientDataService.playersMap.get(id));
            this.getDataForTable();
          }
        }));

    });
  }

  getDataForTable() {
    if (this.team) {
      this.initTable();
      this.initTableGames();
      this.cd.detectChanges();
    }
  }

  goToPlayer(id: number): void {
    this.router.navigate(['player/' + id]);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
