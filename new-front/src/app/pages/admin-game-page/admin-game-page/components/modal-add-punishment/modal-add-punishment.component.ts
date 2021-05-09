import {Component, OnInit, ChangeDetectionStrategy, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Game} from '@models/game/game';
import {SimpleUser} from '@models/users/simple-user';
import {FormControl, FormGroup} from '@angular/forms';
import {EventTypes} from '@models/events/enteties/event-types';

@Component({
  selector: 'lg-modal-add-punishment',
  templateUrl: './modal-add-punishment.component.html',
  styleUrls: ['./modal-add-punishment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalAddPunishmentComponent implements OnInit {
  form: FormGroup;
  punishmentsOptions = [
    EventTypes.Yellow,
    EventTypes.Red,
    EventTypes.YellowRed
  ];

  constructor(
    public dialogRef: MatDialogRef<ModalAddPunishmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {game: Game, players: SimpleUser[]}) {}

  ngOnInit(): void {
    this._initForm();
  }

  private _initForm(): void {
    this.form = new FormGroup({
      type: new FormControl(0),
      minute: new FormControl(0),
      owner: new FormControl(''),
      game: new FormControl(this.data.game._id),
      tournament: new FormControl(this.data.game.tournament._id),
    });
  }

}
