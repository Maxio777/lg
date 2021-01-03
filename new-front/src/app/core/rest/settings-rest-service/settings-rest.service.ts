import { Injectable } from '@angular/core';
import {MainRestService} from '@core/rest/main-rest-service/main-rest.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsRestService {
  api = 'settings';

  constructor(private mainRestService: MainRestService) {
  }

  getSettings(): Observable<any> {
    return this.mainRestService.getLG(this.api);
  }
}
