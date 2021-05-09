import {Pipe, PipeTransform} from '@angular/core';
import {EventTypes} from '@models/events/enteties/event-types';

@Pipe({
  name: 'eventsToString'
})
export class EventsToStringPipe implements PipeTransform {

  transform(value: number): string {
    switch (value) {
      case EventTypes.Goal:
        return 'Гол';
      case EventTypes.Assist:
        return 'Ассист';
      case EventTypes.Yellow:
        return 'Желтая карточка';
      case EventTypes.Red:
        return 'Красноая карточка';
      case EventTypes.YellowRed:
        return 'Вторая желтая карточка';
      case EventTypes.Penalty:
        return 'Пенальти';
      case EventTypes.PenaltyGoal:
        return 'Гол с пенальти';
      case EventTypes.AutoGoal:
        return 'Автогол';
      default:
        return '';
    }
  }

}
