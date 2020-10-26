import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {TeamTable} from '@models/team-table';


@Component({
  selector: 'lg-team-statistics',
  templateUrl: './team-statistics.component.html',
  styleUrls: ['./team-statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamStatisticsComponent {
  @Input() teamStatistic: TeamTable | undefined;

  indicators = [
    {
      text: 'Игры',
      shortText: 'И',
    },
    {
      text: 'Выигрыши',
      shortText: 'В',
      circle: 'green'
    },
    {
      text: 'Ничьи',
      shortText: 'Н',
      circle: 'orange'
    },
    {
      text: 'Поражения',
      shortText: 'П',
      circle: 'red'
    },
    {
      text: 'Забито',
      shortText: 'Г+',
    },
    {
      text: 'Пропущенно',
      shortText: 'Г-',
    },
    {
      text: 'Разница',
      shortText: 'Г+/-',
    },
    {
      text: 'Очки',
      shortText: 'О',
    }
  ];

}
