import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TYPES_EVENTS_11x11, TYPES_EVENTS_5x5 } from '../../../../../assets/constants';
import { PlayerAdmin } from '../../../../../models/interfaces';
import { EventLG } from '../../../../../models/events';

@Component({
  selector: 'app-edit-events',
  templateUrl: './edit-events.component.html',
  styleUrls: ['./edit-events.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditEventsComponent implements OnInit {
  @Input() event: EventLG | null = null;
  @Input() players: PlayerAdmin[] = [];
  @Input() format: string = '';
  @Output() cancelEdit = new EventEmitter<void>();
  @Output() newEvent = new EventEmitter<any>();
  TYPES_EVENTS: any;
  types: any;

  form: FormGroup = this.initForm();

  constructor() {}

  ngOnInit(): void {
    console.log('events-->', this.event);
    this.TYPES_EVENTS = this.format === '11x11' ? TYPES_EVENTS_11x11 : TYPES_EVENTS_5x5;
    this.types = Object.keys(this.TYPES_EVENTS);
    this.setDataToForm();
  }

  private initForm(): FormGroup {
    return new FormGroup({
      _id: new FormControl(''),
      type: new FormControl('', [Validators.required]),
      minute: new FormControl('', [Validators.required]),
      owner: new FormControl('', [Validators.required]),
      assistant: new FormControl(''),
    });
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
