import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs';
import {COLORS} from 'src/app/assets/constants/constants';
import {ClientDataService} from '../../../services/client-data/client-data.service';
import {TeamTable} from '../../../../../models/team-table';
import {TournamentLG} from '../../../../../models/interfaces';


@Component({
  selector: 'app-tournament',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  @Input() display: string[] = [];
  @Input() isShow: boolean = false;

  COLORS = COLORS;
  table: TeamTable[] | undefined = undefined;
  currentTournament: TournamentLG | null = null;
  dataSource: MatTableDataSource<TeamTable> | undefined;
  displayedColumns: string[] =
    ['id', 'teamName', 'gamesCount', 'win', 'loss', 'draws', 'goals', 'missedGoals', 'goalDifference', 'points'];
  title: string | undefined;
  subscriptions: Subscription = new Subscription();

  constructor(
    private clientDataService: ClientDataService,
    private cd: ChangeDetectorRef
  ) {
  }

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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}

