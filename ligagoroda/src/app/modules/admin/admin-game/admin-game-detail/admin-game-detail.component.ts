import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { AdminDataService } from '../../services/admin-data/admin-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { GameLG } from '../../../../models/game';
import { FormGroup } from '@angular/forms';
import { ManagerLG, PlayerAdmin, Referee, TeamLG, TournamentLG } from '../../../../models/interfaces';
import { initForm } from '../../../../core/helpers';
import { RestGameService } from '../../../../rest/rest-game/rest-game.service';
import { ToastrService } from 'ngx-toastr';
import { RestEventService } from '../../../../rest/rest-event/rest-event.service';
import { EventLG } from '../../../../models/events';


@Component({
  selector: 'app-admin-game-detail',
  templateUrl: './admin-game-detail.component.html',
  styleUrls: ['./admin-game-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminGameDetailComponent implements OnInit, OnDestroy {
  controls =
  ['_id', 'tournament', 'homeGoal', 'guestGoal', 'home', 'guest', 'date', 'time', 'tour', 'completed'];
  subs: Subscription = new Subscription();
  game: GameLG | undefined;
  referees: Referee[] = [];
  managers: ManagerLG[] = [];
  tournaments: TournamentLG[] = [];
  teams: TeamLG[] = [];
  players: any;
  id: any;
  form: FormGroup = initForm(this.controls);
  currentEv: EventLG | null = null;

  data$ = combineLatest(
    this.adminDataService.getPlayers$(),
    this.adminDataService.getReferees$(),
    this.adminDataService.getManagers$(),
    this.adminDataService.getTournaments$(),
    this.adminDataService.getTeams$(),
    );

  isEdit: {[key: string]: boolean | number} = {
    homePlayers: false,
    guestPlayers: false,
    homeManagers: false,
    guestManagers: false,
    referees: false,
    events: false,
    eventsEdit: false,
  };

  constructor(
    private adminDataService: AdminDataService,
    private restGameService: RestGameService,
    private restEventService: RestEventService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private toastr: ToastrService,
    private router: Router
  ) { }


  showToast() {
    this.toastr.success('data.message');
  }

  ngOnInit(): void {

    this.subsOfRoute();
    this.getData();
  }

  getAllGamePlayers(): PlayerAdmin[] {
    return (this.game && this.game.homePlayers && this.game.guestPlayers)
      ? [...this.game.homePlayers, ...this.game.guestPlayers]
      : [];
  }

  save() {
    if (this.prepareDataToSave()._id) {
      this.restGameService.updateGameLG(this.prepareDataToSave())
        .subscribe((data) => {
          this.adminDataService.getGames().subscribe();
          this.toastr.success(data.message);
        }, error => this.toastr.error(error.error.message));
    } else {
      const data = this.prepareDataToSave();
      delete data._id;
      data.completed = false;
      this.restGameService.postGameLG(data)
        .subscribe((_data) => {
          this.adminDataService.getGames().subscribe();
          this.toastr.success(_data.message);
          this.form.reset();
          this.router.navigate(['admin/game']);
        }, error => this.toastr.error(error.error.message));
    }
  }

// Обновить игроков команд, судей или менеджеров
  public updateItems(unit: string, newData: string[]) {

    if (this.game && this.game._id) {
      this.restGameService.updateGameLG({_id: this.game._id, data: newData}, unit)
        .subscribe((data) => {
          this.toastr.success(data.message, 'Success');
          this.adminDataService.getGames().subscribe();
        }, error => this.toastr.success(error.message, 'Success'));
    }

  }

  public editSelect(ev: EventLG | null, editItem: string = ''): void {
    if (!this.getAllGamePlayers().length) {
      this.toastr.error('Сначала нужно добавить игроков');
      return;
    }
    this.currentEv = ev;
    Object.keys(this.isEdit).forEach(key => this.isEdit[key] = (key === editItem));
  }

  private subsOfRoute() {
    this.subs.add(this.route.url.pipe(map(url => url[0].path))
      .subscribe(path => {
        if (path === 'game-new') {
          this.form.controls.date.setValue('2000-01-01T15:00:00');
        }
      }));

    this.subs.add(this.route.params.subscribe((params) => {
      if (params.id) {
        this.subs.add(this.adminDataService.getGames$().pipe(
          map((games ) => games.find(game => game._id === params.id)),
          tap((game ) => game && game.homeManagers ? game.homeManagers.forEach(m => m.selected = false) : undefined))
          .subscribe((game) => {
            this.game = game;
            if (this.game) {
              this.setDataToForm(this.game);
              this.cd.detectChanges();
            }
            this.cd.detectChanges();
        }));
      }
    }));
  }

  setDataToForm(game: GameLG) {
    this.form.controls._id.setValue(game && game._id ? game._id : null);
    this.form.controls.date.setValue(game && game.date ? game.date.substring(0, 19) : '2000-01-01T00:00:00');
    this.form.controls.guestGoal.setValue(game.guestGoal);
    this.form.controls.homeGoal.setValue(game.homeGoal);
    this.form.controls.tour.setValue(game.tour);
    this.form.controls.tournament.setValue(game && game.tournament ? game.tournament._id : null);
    this.form.controls.completed.setValue(game.completed ? game.completed : false);
    this.form.controls.home.setValue(game.home && game.home._id ? game.home._id : null);
    this.form.controls.guest.setValue(game.guest && game.guest._id ? game.guest._id : null);
  }

  prepareDataToSave() {
    const data = this.form.getRawValue();
    data.date = new Date(data.date);
    return data;
  }

  getData() {
    return this.data$.subscribe(
      ([players, referees, managers, tournaments, teams]) => {
        managers.forEach(m => m.selected = false);
        this.referees = referees;
        this.players = players;
        this.managers = managers;
        this.tournaments = tournaments;
        this.teams = teams;
        this.form.controls.tour.setValue(18);
        this.cd.detectChanges();
      });
  }
  /** Обогатить евент ids игры и турнира */
  enrichEvent(event: EventLG) {
    if (this.game) {
      event.game = this.game._id;
      event.tournament = this.game.tournament._id;
      const keys: string[] = Object.keys(event);
      keys.forEach(key => {
        // @ts-ignore
        if (!event[key]) {
          // @ts-ignore
          delete event[key];
        }
      });
    }
    return event;

  }

  postOrUpdate(event: EventLG): Observable<any> {
    return event._id
      ?  this.restEventService.updateEventLG(event)
      :  this.restEventService.postEventLG(event);
  }

  createEvent(event: any) {
    if (this.game) {
      event = this.enrichEvent(event);

        this.subs.add(this.postOrUpdate(event).subscribe(data => {
          if (this.game && data.ev) {
            this.game.events.push(data.ev);

            this.subs.add(this.restGameService.updateGameLG(this.game).subscribe(
              data2 => this.toastr.success(data2.message),
              error => this.toastr.error(error.error.message)));
          }
          this.toastr.success(data.message);
          this.adminDataService.getGames().subscribe();

        }, error => this.toastr.error(error.error.message)));
    }
  }

  getEventsForPlayer(player: PlayerAdmin): EventLG[] {
    // @ts-ignore
    return this.game ? this.game.events.filter(event => event.owner === player._id) : [];
  }

  ngOnDestroy = (): void => this.subs.unsubscribe();

}
