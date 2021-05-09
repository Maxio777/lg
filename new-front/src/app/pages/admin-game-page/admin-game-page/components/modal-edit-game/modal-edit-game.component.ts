import {Component, OnInit, ChangeDetectionStrategy, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup} from '@angular/forms';
import {Game} from '@models/game/game';

@Component({
  selector: 'lg-modal-edit-game',
  templateUrl: './modal-edit-game.component.html',
  styleUrls: ['./modal-edit-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalEditGameComponent implements OnInit {
  form: FormGroup;
  private _controls = ['homeGoal', 'guestGoal', 'date', 'tour', 'completed'];

  constructor(
    public dialogRef: MatDialogRef<ModalEditGameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Game) {}

  ngOnInit(): void {
    this._initForm();
  }

  private _initForm(): void {
    const controls = {};
    this._controls.forEach(control => {
        controls[control] = new FormControl(this.data[control]);
    });
    this.form = new FormGroup(controls);
  }

}
