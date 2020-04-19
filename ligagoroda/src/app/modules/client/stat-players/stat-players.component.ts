import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { sortBy } from 'lodash';
import { PlayerClient } from '../../../models/interfaces';
import { Subscription } from 'rxjs';
import { ClientDataService } from '../services/client-data/client-data.service';


@Component({
  selector: 'app-stat-players',
  templateUrl: './stat-players.component.html',
  styleUrls: ['./stat-players.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatPlayersComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  @Input() data: string[] = [];
  @Input() display: string[] = [];
  @Input() isMainPage: boolean = false;

  dataSource: MatTableDataSource<PlayerClient> | undefined;
  displayedColumns: string[] =
    ['id', 'photo', 'team', 'playerName', 'dateOfBirth', 'gamesCount', 'goalsCount', 'assistsCount', 'goalsAssists', 'yellow', 'red'];
  players: PlayerClient[] | undefined;
  currentVal = 'goalsCount';
  sub: Subscription = new Subscription();


  constructor(
    private router: Router,
    private clientDataService: ClientDataService,
    private cd: ChangeDetectorRef
  ) { }

  changeCurrentVal(val: string): void {
    this.currentVal = val;
    this.players = sortBy(this.players, val).reverse();
    const pl = this.players.slice(0, 10);
    this.dataSource = new MatTableDataSource<any>(pl);
  }

  getDisplay(): string[] {
    return ['id', 'team_image', 'playerName', this.currentVal];
  }

  ngOnInit(): void {
    this.sub.add(this.clientDataService.getPlayers$().subscribe(players => {
      this.initTable(players);
    }));
  }

  initTable(players: PlayerClient[]) {
    players = sortBy(players, 'goalsCount').reverse();
    this.players = players;
    this.dataSource = new MatTableDataSource<PlayerClient>(this.isMainPage ? players.slice(0, 10) : players);
    this.cd.detectChanges();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  goToPlayer(id: number): void {
    this.router.navigate(['player/' + id]);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
