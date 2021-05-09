import {Component, OnInit, ChangeDetectionStrategy, Inject, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EventTypes} from '@models/events/enteties/event-types';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Game} from '@models/game/game';
import {SimpleUser} from '@models/users/simple-user';
import {Subscription} from 'rxjs';
import {combineLatest} from 'rxjs';


@Component({
  selector: 'lg-modal-add-goal',
  templateUrl: './modal-add-goal.component.html',
  styleUrls: ['./modal-add-goal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalAddGoalComponent implements OnInit, OnDestroy {
  private _subs: Subscription;
  form: FormGroup;
  goalsOptions = [
    EventTypes.Goal,
    EventTypes.PenaltyGoal,
    EventTypes.AutoGoal
  ];

  constructor(
    public dialogRef: MatDialogRef<ModalAddGoalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {game: Game, players: SimpleUser[]}) {
    this._subs = new Subscription();
  }

  ngOnInit(): void {
    this._initForm();
    this._clearAssistant();
  }

  get assistantOptions(): SimpleUser[] {
    return this.data?.players?.filter(p => p._id !== this.form.controls.owner.value);
  }

  get isGoalAndOwner(): boolean {
    return this.form.controls.type.value === EventTypes.Goal && !!this.form.controls.owner.value;
  }

  private _initForm(): void {
    this.form = new FormGroup({
      type: new FormControl(0, [Validators.required]),
      minute: new FormControl(1, [
        Validators.required,
        Validators.min(1),
        Validators.max(90)
      ]),
      owner: new FormControl('', [Validators.required]),
      assistant: new FormControl(''),
      game: new FormControl(this.data.game._id),
      tournament: new FormControl(this.data.game.tournament._id),
    });
  }

  private _clearAssistant(): void {
    const observers$ = combineLatest([this.form.controls.type.valueChanges, this.form.controls.owner.valueChanges]);
    this._subs.add(observers$.subscribe(([type, owner]) => {
      if (type !== EventTypes.Goal || owner === this.form.controls.assistant.value) {
        this.form.controls.assistant.setValue('');
      }
    }));
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

}
