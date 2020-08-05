import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {TeamLG} from '../../../models/interfaces';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamInfoComponent implements OnInit {
  @Input() team: TeamLG | undefined;

  constructor() { }

  ngOnInit() {
  }

}
