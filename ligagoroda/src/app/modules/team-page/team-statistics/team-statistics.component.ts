import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {TeamTable} from '../../../models/team-table';

@Component({
  selector: 'app-team-statistics',
  templateUrl: './team-statistics.component.html',
  styleUrls: ['./team-statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamStatisticsComponent implements OnInit {
  @Input() teamStatistic: TeamTable | undefined;

  indicators = [
    {
      text: 'Игры',
    },
    {
      text: 'Победы',
      circle: 'green'
    },
    {
      text: 'Ничьи',
      circle: 'yellow'
    },
    {
      text: 'Поражения',
      circle: 'red'
    },
    {
      text: 'Забито',
    },
    {
      text: 'Пропущенно',
    },
    {
      text: 'Разница',
    },
    {
      text: 'Очки'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
