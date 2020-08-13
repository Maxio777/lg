import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {Referee} from '../../../../models/interfaces';

@Component({
  selector: 'app-referees',
  templateUrl: './referees.component.html',
  styleUrls: ['./referees.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RefereesComponent {
  @Input() referees: Referee[] = [];
}
