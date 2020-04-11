import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { URLS } from 'src/app/core/urls';
import { ClientDataService } from '../services/client-data/client-data.service';
import { TeamTable } from '../../../models/team-table';
import {TournamentLG} from '../../../models/interfaces';


@Component({
  selector: 'app-tournament',
  templateUrl: './tournament-table.component.html',
  styleUrls: ['./tournament-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TournamentTableComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  @Input() display: string[] = [];
  @Input() isMainPage: boolean = false;

  URLS = URLS;
  table: TeamTable[] | undefined = undefined;
  currentTournament: TournamentLG | null = null;
  dataSource: MatTableDataSource<TeamTable> | undefined;
  displayedColumns: string[] =
    ['id', 'teamName', 'gamesCount', 'win', 'loss', 'draws', 'goals', 'missedGoals', 'goalDifference', 'points'];
  displayedColumnsForMainPage: string[] = ['id', 'teamName', 'gamesCount', 'points'];
  title: string | undefined;
  subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    private clientDataService: ClientDataService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.clientDataService.getTable$().subscribe(table => {
      this.table = table;
      this.initTable(table);
    });
    this.clientDataService.getTournament$().subscribe(tournament => {
      this.currentTournament = tournament;
      this.cd.detectChanges();
    });
  }

  initTable(table: TeamTable[]): void {
      this.dataSource = new MatTableDataSource<TeamTable>(table);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.cd.detectChanges();
  }

  goToUrl = (url: string, id = '') => this.router.navigate([url + id]);

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}

