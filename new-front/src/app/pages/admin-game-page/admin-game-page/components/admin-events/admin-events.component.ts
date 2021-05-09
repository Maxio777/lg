import {Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import {Game} from '@models/game/game';
import {EventTypes} from '@models/events/enteties/event-types';
import {GamePageService} from 'src/app/pages/game-page/game-page-service/game-page.service';
import {EventLG} from '@models/events';
import {MatDialog} from '@angular/material/dialog';
import {DeleteConfirmationComponent} from 'src/app/pages/admin-game-page/admin-game-page/components/admin-events/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'lg-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminEventsComponent {
  @Input() game: Game | undefined;
  @Input() title = '';
  @Input() isGoals: boolean;
  @Input() isAdmin = false;
  @Output() deleteEvent = new EventEmitter<string>();

  private _goalsTypes = [
    EventTypes.Goal,
    EventTypes.PenaltyGoal,
    EventTypes.AutoGoal,
  ];

  private _punishmentsTypes = [
    EventTypes.Yellow,
    EventTypes.YellowRed,
    EventTypes.Red,
  ];

  constructor(public gamePageService: GamePageService, private readonly _dialog: MatDialog) {
  }

  get events(): EventLG[] {
    return this.game?.events?.filter(e => {
      return this.isGoals
        ? this._goalsTypes.includes(e?.type)
        : this._punishmentsTypes.includes(e?.type);
    }).sort((a, b) => a.minute - b.minute);
  }

  openDialogDeleteConfirm(_id: string): void {
    const dialog = this._dialog.open(
      DeleteConfirmationComponent,
      {
        width: 'fit-content',
        minWidth: '350px',
        maxWidth: '90%',
        data: {_id},
        disableClose: false
      });
    dialog.afterClosed().subscribe((res) => {
      console.log(res);
      if (res) {
        this.deleteEvent.emit(_id);
      }});
  }
}
