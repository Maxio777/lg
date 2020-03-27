import { Injectable } from '@angular/core';
import { MainRestService } from '../main-rest-service';
import { Observable } from 'rxjs';
import { EventLG } from '../../models/events';


@Injectable({
  providedIn: 'root'
})
export class RestEventService {
  apiLG: string = 'admin/event/';

  constructor(private mainRestService: MainRestService) {}

  getEventLG(): Observable<EventLG[]> {
    return this.mainRestService.getLG(this.apiLG);
  }

  updateEventLG(body: any, unit: string = ''): Observable<any> {
    return this.mainRestService.putLG(body, this.apiLG + unit);
  }

  postEventLG(body: any): Observable<any> {
    return this.mainRestService.postLG(body, this.apiLG);
  }

  deleteEventLG(idGame: string): Observable<any> {
    return this.mainRestService.deleteLG(idGame, this.apiLG + idGame);
  }
}
