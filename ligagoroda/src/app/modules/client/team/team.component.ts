import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PlayerClient, TeamLG } from '../../../models/interfaces';
import { RestTeamsService } from '../../../rest/rest-teams/rest-teams.service';
import { ClientDataService } from '../services/client-data/client-data.service';
import { map } from 'rxjs/operators';
import { GameLG } from '../../../models/game';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  @Input() data: string[] = [];
  @Input() display: string[] = [];
  dataSource?: MatTableDataSource<PlayerClient[]>;
  displayedColumns: string[] =
    ['id', 'photo', 'playerName', 'dateOfBirth', 'gamesCount', 'goalsCount', 'assistsCount', 'yellow', 'red'];
  dataSourceGames?: MatTableDataSource<GameLG[]> | null = null;
  displayedColumnsGames: string[] =
    ['date', 'home', 'score', 'guest', 'tour'];

  team?: TeamLG | null = null;

  constructor(
    private route: ActivatedRoute,
    private restTeamsService: RestTeamsService,
    private clientDataService: ClientDataService,
    private router: Router,
    private cd: ChangeDetectorRef
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
    if (this.team && this.team.players) {
      this.dataSource = new MatTableDataSource<any>(this.team.players);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }

  }

  getTeamDetail() {
    this.route.params.subscribe((params: Params) => {
      const idTeam = params.id;
      this.clientDataService.getIsInitAppData().subscribe(() => {
        return this.restTeamsService.getTeam(idTeam)
          .pipe(map(team => {
            team.games = team.games.map((id: string) => this.clientDataService.gamesMap.get(id));
            team.players = team.players.map((id: string) => this.clientDataService.playersMap.get(id));
            return team;
          }))
          .subscribe((team: any) => {
            this.team = team;
            this.getDataForTable();
          });
      });

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



}
