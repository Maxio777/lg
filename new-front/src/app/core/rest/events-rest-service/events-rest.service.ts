import { Injectable } from '@angular/core';
import {MainRestService} from '@core/rest/main-rest-service/main-rest.service';
import {Observable} from 'rxjs';
import {EventLG} from '@models/events';

@Injectable({
  providedIn: 'root'
})
export class EventsRestService {
  apiLG = 'admin/event/';

  constructor(private mainRestService: MainRestService) {
  }

  getEventLG(): Observable<EventLG[]> {
    return this.mainRestService.getLG(this.apiLG);
  }

  updateEventLG(body: any, unit: string = ''): Observable<any> {
    return this.mainRestService.putLG(body, this.apiLG + unit);
  }

  postEventLG(body: any): Observable<any> {
    return this.mainRestService.postLG(body, this.apiLG);
  }

  deleteEventLG(id: string): Observable<any> {
    return this.mainRestService.deleteLG(this.apiLG + id);
  }
}
