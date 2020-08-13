import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {TeamLG} from '../../../models/interfaces';

@Component({
  selector: 'app-team-name',
  templateUrl: './team-name.component.html',
  styleUrls: ['./team-name.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamNameComponent {
  @Input() team: TeamLG | undefined;
}
