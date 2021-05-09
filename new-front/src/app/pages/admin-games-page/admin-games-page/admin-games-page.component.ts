import {Component, OnInit, ChangeDetectionStrategy, OnDestroy, ViewChild, Input} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Game} from '@models/game/game';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {GamesRestService} from '@core/rest/games-rest-service/games-rest.service';
import {FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {TeamLG, TournamentLG} from '@models/interfaces';
import {initForm} from '@core/helpers';
import {GameCreate} from '@models/game/game-create';
import {RestTournamentService} from '@core/rest/tournament-rest-service/rest-tournament.service';
import {TeamsRestService} from '@core/rest/teams-rest-service/teams-rest.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'lg-admin-games-page',
  templateUrl: './admin-games-page.component.html',
  styleUrls: ['./admin-games-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminGamesPageComponent implements OnInit, OnDestroy {
  @ViewChild('addRef') addRef: any;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined = undefined;
  @ViewChild(MatSort) sort: MatSort | undefined = undefined;
  @Input() data: string[] = [];
  @Input() display: string[] = [];

  games: Game[] = [];
  tournaments: TournamentLG[] = [];
  teams: TeamLG[] = [];
  subs: Subscription = new Subscription();
  dataSource: any;
  displayedColumns: string[] = ['tour', 'date', 'home', 'homeGoal', 'guestGoal', 'guest', 'completed', 'action'];
  controls: string[] = ['tournament', 'home', 'guest', 'date', 'tour'];
  form: FormGroup = initForm(this.controls);

  goToGame = (id: string) => this.router.navigate(['/admin/games/' + id]);

  constructor(
    private router: Router,
    private gamesRestService: GamesRestService,
    private restTournamentService: RestTournamentService,
    private teamsRestService: TeamsRestService,
    public dialog: MatDialog,
    public toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.getGames();
    this.getTournamentsLG();
    this.getTeams();
  }

  closeModal(): void {
    this.dialog.closeAll();
  }

  addGames(): void {
    this.gamesRestService.postGame(GameCreate.fromJs(this.form.getRawValue()))
      .subscribe(
        () => {
          this.getGames();
          this.toastr.success('Игра добавлена');
        },
        (e) => this.toastr.error('Ошибка')
        );
  }

  openDialog(): void {
    const dialog = this.dialog.open(this.addRef, {width: '450px', maxWidth: '90%'});
    dialog.afterClosed().subscribe(() => this.form.reset());
  }

  deleteGameLG(id: string): void {
    this.gamesRestService.deleteGame(id).subscribe(() => this.getGames());
  }

  /* Инициализация таблицы*/
  private initTable(): void {
    this.dataSource = new MatTableDataSource<Game>(this.games);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private getGames(): void {
    this.subs.add(this.gamesRestService.getGame<Game[]>()
      .subscribe((games: Game[]) => {
        this.games = games;
        this.initTable();
      }));
  }

  private getTournamentsLG(): void {
    this.subs.add(this.restTournamentService.getTournament().subscribe(tournaments => {
      this.tournaments = tournaments;
    }));
  }

  private getTeams(): void {
    this.subs.add(this.teamsRestService.getTeams().subscribe(teams => {
      this.teams = teams;
    }));
  }

  applyFilter(filterValue: string): void {
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
