import {PlayerAdmin} from '@models/interfaces';
import {EventTypes} from '@models/events/enteties/event-types';

export class EventUpdateModel {
  type: EventTypes;
  minute: number;
  owner: PlayerAdmin;
  assistant: PlayerAdmin;
  game: string;
  tournament: string;

  constructor(event) {
    this.type = event.type;
    this.minute = event.minute;
    this.owner = event.owner;
    this.assistant = event.assistant || null;
    this.game = event.game;
    this.tournament = event.tournament;
  }


  static fromJs(event): EventUpdateModel {
    if (event) {
      return new EventUpdateModel(event);
    }
    return null;
  }

}
