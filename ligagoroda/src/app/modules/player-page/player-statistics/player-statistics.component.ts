import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {PlayerClient} from '../../../models/interfaces';

@Component({
  selector: 'app-player-statistics',
  templateUrl: './player-statistics.component.html',
  styleUrls: ['./player-statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerStatisticsComponent {
  @Input() player: PlayerClient | undefined;

  indicators = [
    {
      img: 'games',
      text: 'Игры'
    },
    {
      img: 'goal',
      text: 'Голы'
    },
    {
      img: 'assist',
      text: 'Пасы'
    },
    {
      img: 'goal-and-assist',
      text: 'ГолПас'
    },
    {
      img: 'yellow',
      text: 'ЖК',
      tooltip: 'Желтая карточка'
    },
    {
      img: 'red-yellow',
      text: 'ВЖК',
      tooltip: 'Вторая желтая карточка'
    },
    {
      img: 'red',
      text: 'КК',
      tooltip: 'Красная карточка'
    },
    {
      img: 'penalty',
      text: 'Голы с пенальти'
    },
    {
      img: 'autogoal',
      text: 'Автоголы'
    },
  ];
}
