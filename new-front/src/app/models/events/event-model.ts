import {PlayerAdmin} from '@models/interfaces';
import {EventTypes} from '@models/events/enteties/event-types';


export class EventModel {
  _id: string;
  type: EventTypes;
  minute: number;
  owner: PlayerAdmin;
  assistant: PlayerAdmin;
  game: string;
  tournament: string;

  constructor(event) {
    this._id = event._id || null;
    this.type = event.type;
    this.minute = event.minute;
    this.owner = event.owner;
    this.assistant = event.assistant;
    this.game = event.game;
    this.tournament = event.tournament;
  }


  static fromJs(event): EventModel {
    if (event) {
      return new EventModel(event);
    }
    return null;
  }

  static fromJsArr(events): EventModel[] {
    if (events && events.length) {
      return events.map(manager => EventModel.fromJs(manager));
    }
    return null;
  }

}
