import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {TeamLG} from '@models/interfaces';

@Component({
  selector: 'lg-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamInfoComponent {
  @Input() team: TeamLG | undefined;
}
