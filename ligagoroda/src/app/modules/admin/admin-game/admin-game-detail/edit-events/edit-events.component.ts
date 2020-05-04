import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TYPES_EVENTS_11X11, TYPES_EVENTS_5X5 } from '../../../../../assets/constants/constants';
import { PlayerAdmin } from '../../../../../models/interfaces';
import { EventLG } from '../../../../../models/events';

@Component({
  selector: 'app-edit-events',
  templateUrl: './edit-events.component.html',
  styleUrls: ['./edit-events.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditEventsComponent implements OnInit {

  constructor() {}
  @Input() event: EventLG | null = null;
  @Input() players: PlayerAdmin[] = [];
  @Input() format: string = '';
  @Output() cancelEdit = new EventEmitter<void>();
  @Output() newEvent = new EventEmitter<any>();
  TYPES_EVENTS: any;
  types: any;

  form: FormGroup = EditEventsComponent.initForm();

  static initForm(): FormGroup {
    return new FormGroup({
      _id: new FormControl(''),
      type: new FormControl('', [Validators.required]),
      minute: new FormControl('', [Validators.required]),
      owner: new FormControl('', [Validators.required]),
      assistant: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.TYPES_EVENTS = this.format === '11x11' ? TYPES_EVENTS_11X11 : TYPES_EVENTS_5X5;
    this.types = Object.keys(this.TYPES_EVENTS);
    this.setDataToForm();
  }

  private setDataToForm(): void {
    if (this.event) {
      const ev = this.event;
      this.form.controls._id.setValue(ev._id);
      this.form.controls.type.setValue(ev.type);
      this.form.controls.minute.setValue(ev.minute);
      this.form.controls.owner.setValue(ev.owner);
      this.form.controls.assistant.setValue(ev.assistant);
    }
  }

  public submit(): void {
    if (this.form.valid) {
      this.newEvent.emit(this.form.getRawValue());
    }
  }

  public cancel(): void {
    this.cancelEdit.emit();
  }

}
