import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminDataService } from '../services/admin-data/admin-data.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { GameLG } from '../../../models/game';
import { RestGameService } from '../../../rest/rest-game/rest-game.service';


@Component({
  selector: 'app-admin-game',
  templateUrl: './admin-game.component.html',
  styleUrls: ['./admin-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminGameComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined = undefined;
  @ViewChild(MatSort) sort: MatSort | undefined = undefined;
  @Input() data: string[] = [];
  @Input() display: string[] = [];

  games: GameLG[] = [];
  subs: Subscription = new Subscription();
  dataSource: any;
  openAdd: boolean = false;
  displayedColumns: string[] = ['_id', 'tour', 'date', 'home', 'homeGoal', 'guestGoal', 'guest', 'completed', 'action'];

  goToGame = (id: string) => this.router.navigate(['/admin/game/' + id]);
  goToNew = () => this.router.navigate(['/admin/game-new']);

  constructor(
    private router: Router,
    private adminDataService: AdminDataService,
    private restGameService: RestGameService
  ) {}

  ngOnInit() {
    this.getGamesLG();
  }

  deleteGameLG(_id: string) {
    this.restGameService.deleteGameLG(_id).subscribe();
  }

/* Инициализация таблицы*/
  initTable(): void {
    this.dataSource = new MatTableDataSource<GameLG>(this.games);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

/*Получаем игры*/
  getGamesLG(): void {
    this.subs.add(this.adminDataService.getGames$()
      .subscribe((games: GameLG[]) => {
        this.games = games;
        this.initTable();
      }));
  }

  applyFilter(filterValue: string): void {
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  ngOnDestroy = (): void  => this.subs.unsubscribe();
}
