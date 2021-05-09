import {Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {Observable, pipe, Subscription} from 'rxjs';
import {Game} from '@models/game/game';
import {PlayerAdmin, PlayerClient, Referee, TeamLG, TournamentLG} from '@models/interfaces';
import {ManagerLG} from '@models/manager';
import {FormGroup} from '@angular/forms';
import {initForm} from '@core/helpers';
import {EventLG} from '@models/events';
import {map, mergeMap, tap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {GamesRestService} from '@core/rest/games-rest-service/games-rest.service';
import {EventsRestService} from '@core/rest/events-rest-service/events-rest.service';
import {MatDialog} from '@angular/material/dialog';
import {ModalEditGameComponent} from 'src/app/pages/admin-game-page/admin-game-page/components/modal-edit-game/modal-edit-game.component';
import {GameInfoUpdate} from '@models/game/game-info-update';
import {ModalEditComponent} from 'src/app/pages/admin-game-page/admin-game-page/components/modal-edit-lineups/modal-edit.component';
import {GameHomePlayersUpdate} from '@models/game/game-home-players-update';
import {GameGuestPlayersUpdate} from '@models/game/game-guest-players-update';
import {SimpleUser} from '@models/users/simple-user';
import {RefereeModel} from '@models/referee/referee-model';
import {GameRefereesUpdate} from '@models/game/game-referees-update';
import {RefereesRestService} from '@core/rest/referees-rest-service/referees-rest.service';
import {GameHomeManagersUpdate} from '@models/game/game-home-managers-update';
import {GameGuestManagersUpdate} from '@models/game/game-guest-managers-update';
import {ModalAddPunishmentComponent} from 'src/app/pages/admin-game-page/admin-game-page/components/modal-add-punishment/modal-add-punishment.component';
import {EventModel} from '@models/events/event-model';
import {EventUpdateModel} from '@models/events/event-update-model';
import {ModalAddGoalComponent} from 'src/app/pages/admin-game-page/admin-game-page/components/modal-add-goal/modal-add-goal.component';

@Component({
  selector: 'lg-admin-game-page',
  templateUrl: './admin-game-page.component.html',
  styleUrls: ['./admin-game-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminGamePageComponent implements OnInit, OnDestroy {
  _gameId: string;
  controls =
    ['_id', 'tournament', 'homeGoal', 'guestGoal', 'home', 'guest', 'date', 'time', 'tour', 'completed'];
  subs: Subscription = new Subscription();
  game: Game | undefined;
  referees: RefereeModel[] = [];
  managers: ManagerLG[] = [];
  tournaments: TournamentLG[] = [];
  teams: TeamLG[] = [];
  players: any;
  id: any;
  form: FormGroup = initForm(this.controls);
  currentEv: EventLG | null = null;

  isEdit: { [key: string]: boolean | number } = {
    homePlayers: false,
    guestPlayers: false,
    homeManagers: false,
    guestManagers: false,
    referees: false,
    events: false,
    eventsEdit: false,
  };

  constructor(
    private readonly _gamesRestService: GamesRestService,
    private readonly _refereesRestService: RefereesRestService,
    private readonly _eventsRestService: EventsRestService,
    private readonly eventsRestService: EventsRestService,
    private readonly route: ActivatedRoute,
    private readonly cd: ChangeDetectorRef,
    private readonly toastr: ToastrService,
    private readonly router: Router,
    private readonly _dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getGames();
    this.getReferees();
  }

  private getReferees(): void {
    this._refereesRestService.getRefereeLG().subscribe(referees => {
      this.referees = RefereeModel.fromJsArr(referees);
      this.cd.detectChanges();
    })
  }

  onEditHomePlayers(): void {
    this.openDialog<{allItems: SimpleUser[], items: SimpleUser[]}>(
      ModalEditComponent,
      GameHomePlayersUpdate,
      {
        allItems: SimpleUser.fromJsArr(this.game.home.players),
        items: SimpleUser.fromJsArr(this.game.homePlayers)
      }
    );
  }

  onEditGuestPlayers(): void {
    this.openDialog<{allItems: SimpleUser[], items: SimpleUser[]}>(
      ModalEditComponent,
      GameGuestPlayersUpdate,
      {
        allItems: SimpleUser.fromJsArr(this.game.guest.players),
        items: SimpleUser.fromJsArr(this.game.guestPlayers)
      }
    );
  }

  onEditRefereesPlayers(): void {
    this.openDialog<{allItems: SimpleUser[], items: SimpleUser[]}>(
      ModalEditComponent,
      GameRefereesUpdate,
      {
        allItems: SimpleUser.fromJsArr(this.referees),
        items: SimpleUser.fromJsArr(this.game.referees)
      }
    );
  }

  onEditHomeManagers(): void {
    this.openDialog<{allItems: SimpleUser[], items: SimpleUser[]}>(
      ModalEditComponent,
      GameHomeManagersUpdate,
      {
        allItems: SimpleUser.fromJsArr(this.game.home.managers),
        items: SimpleUser.fromJsArr(this.game.homeManagers)
      }
    );
  }

  onEditGuestManagers(): void {
    this.openDialog<{allItems: SimpleUser[], items: SimpleUser[]}>(
      ModalEditComponent,
      GameGuestManagersUpdate,
      {
        allItems: SimpleUser.fromJsArr(this.game.guest.managers),
        items: SimpleUser.fromJsArr(this.game.guestManagers)
      }
    );
  }

  onAddHomePunishments(): void {
    this.openDialog<{game: Game, players: SimpleUser[]}>(
      ModalAddPunishmentComponent,
      EventUpdateModel,
      {
        game: this.game,
        players: SimpleUser.fromJsArr(this.game.homePlayers)
      },
      true
    );
  }

  onAddGuestPunishments(): void {
    this.openDialog<{game: Game, players: SimpleUser[]}>(
      ModalAddPunishmentComponent,
      EventUpdateModel,
      {
        game: this.game,
        players: SimpleUser.fromJsArr(this.game.guestPlayers)
      },
      true
    );
  }

  onAddHomeGoals(): void {
    this.openDialog<{game: Game, players: SimpleUser[]}>(
      ModalAddGoalComponent,
      EventUpdateModel,
      {
        game: this.game,
        players: SimpleUser.fromJsArr(this.game.homePlayers)
      },
      true
    );
  }

  onAddGuestGoals(): void {
    this.openDialog<{game: Game, players: SimpleUser[]}>(
      ModalAddGoalComponent,
      EventUpdateModel,
      {
        game: this.game,
        players: SimpleUser.fromJsArr(this.game.guestPlayers)
      },
      true
    );
  }

  onEditGameInfo(): void {
    this.openDialog<Game>(ModalEditGameComponent, GameInfoUpdate, this.game);
  }

  onDeleteEvent(_id: string): void {

    this._eventsRestService.deleteEvent(_id)
      .pipe(
        mergeMap(() => {
          const events = [...this.game.events.filter(ev => ev._id !== _id).map(e => e._id)];
          return this._gamesRestService._updateGame(this.game._id, {events: [...events]});
        }),
        mergeMap(() => this._gamesRestService.getGame<Game>(this.game._id)))
      .subscribe((game => {
        this.game = game;
        this.cd.detectChanges();
      }));
  }

  openDialog<T>(component: any, updateClass: any, _data: T, isNewEvent = false): void {
    const dialog = this._dialog.open(
      component,
      {
        width: 'fit-content',
        minWidth: '350px',
        maxWidth: '90%',
        data: _data,
        disableClose: false
      });
    dialog.afterClosed().subscribe((updateData) => {
      console.log(updateData);
      if (updateData) {
        if (isNewEvent) {
          this._eventsRestService.postEvent(updateClass.fromJs(updateData))
            .subscribe(event => {
              const events = new Set([event._id, ...this.game.events.map(e => e._id)]);
              this.updateGame<any>({events: [...events.values()]});
            });
        } else {
          this.updateGame<typeof updateClass>(updateClass.fromJs(updateData));
        }

      }
    });
  }

  updateGame<T>(data: T): void {
    this._gamesRestService._updateGame(this.game._id, data)
      .pipe(mergeMap(() => this._gamesRestService.getGame<Game>(this.game._id)))
      .subscribe((game => {
        this.game = game;
        this.cd.detectChanges();
      }));
  }

  getAllGamePlayers(): PlayerAdmin[] {
    return (this.game && this.game.homePlayers && this.game.guestPlayers)
      ? [...this.game.homePlayers, ...this.game.guestPlayers]
      : [];
  }

  save() {
    console.log(GameInfoUpdate.fromJs(this.form.value));
    // if (this.prepareDataToSave()._id) {
    //   this.restGameService.updateGameLG(this.prepareDataToSave())
    //     .subscribe((data) => {
    //       this.adminDataService.getGames().subscribe();
    //       this.toastr.success(data.message);
    //     }, error => this.toastr.error(error.error.message));
    // } else {
    //   const data = this.prepareDataToSave();
    //   delete data._id;
    //   data.completed = false;
    //   this.restGameService.postGameLG(data)
    //     .subscribe((_data) => {
    //       this.adminDataService.getGames().subscribe();
    //       this.toastr.success(_data.message);
    //       this.form.reset();
    //       this.router.navigate(['admin/game']);
    //     }, error => this.toastr.error(error.error.message));
    // }
  }

// Обновить игроков команд, судей или менеджеров
//   public updateItems(unit: string, newData: string[]) {
//
//     if (this.game && this.game._id) {
//       this.restGameService.updateGameLG({_id: this.game._id, data: newData}, unit)
//         .subscribe((data) => {
//           this.toastr.success(data.message, 'Success');
//           this.adminDataService.getGames().subscribe();
//         }, error => this.toastr.success(error.message, 'Success'));
//     }
//
//   }

  public editSelect(ev: EventLG | null, editItem: string = ''): void {
    if (!this.getAllGamePlayers().length) {
      this.toastr.error('Сначала нужно добавить игроков');
      return;
    }
    this.currentEv = ev;
    Object.keys(this.isEdit).forEach(key => this.isEdit[key] = (key === editItem));
  }

  getGames(): void {
    this.subs.add(
      this.route.params.pipe(
        tap((params) => this._gameId = params.id),
        mergeMap(params => this._gamesRestService.getGame<Game>(params.id)))
        .pipe(map(game => Game.fromJs(game)))
        .subscribe(game => {
          this.game = game;
          console.log(this.game.homePlayers);
          this.setDataToForm(this.game);
          this.cd.detectChanges();
        }));
  }

  setDataToForm(game: Game): void {
    this.form.controls._id.setValue(game && game._id ? game._id : null);
    this.form.controls.date.setValue(game && game.date ? game.date.toString().substring(0, 19) : '2000-01-01T00:00:00');
    this.form.controls.guestGoal.setValue(game.guestGoal);
    this.form.controls.homeGoal.setValue(game.homeGoal);
    this.form.controls.tour.setValue(game.tour);
    this.form.controls.tournament.setValue(game && game.tournament ? game.tournament._id : null);
    this.form.controls.completed.setValue(game.completed ? game.completed : false);
    this.form.controls.home.setValue(game?.home?.name || null);
    this.form.controls.guest.setValue(game.guest && game.guest._id ? game.guest._id : null);
  }

  prepareDataToSave(): void {
    const data = this.form.getRawValue();
    data.date = new Date(data.date);
    return data;
  }

  /** Обогатить евент ids игры и турнира */
  enrichEvent(event: EventLG): EventLG {
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

  // postOrUpdate(event: EventLG): Observable<any> {
  //   return event._id
  //     ? this.restEventService.updateEventLG(event)
  //     : this.restEventService.postEventLG(event);
  // }

  // createEvent(event: any) {
  //   if (this.game) {
  //     event = this.enrichEvent(event);
  //
  //     this.subs.add(this.postOrUpdate(event).subscribe(data => {
  //       if (this.game && data.ev) {
  //         this.game.events.push(data.ev);
  //
  //         this.subs.add(this.restGameService.updateGameLG(this.game).subscribe(
  //           data2 => this.toastr.success(data2.message),
  //           error => this.toastr.error(error.error.message)));
  //       }
  //       this.toastr.success(data.message);
  //       this.adminDataService.getGames().subscribe();
  //
  //     }, error => this.toastr.error(error.error.message)));
  //   }
  // }

  getEventsForPlayer(player: PlayerAdmin): EventLG[] {
    // @ts-ignore
    return this.game ? this.game.events.filter(event => event.owner === player._id) : [];
  }

  ngOnDestroy = (): void => this.subs.unsubscribe();

}
