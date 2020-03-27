import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MainRestService } from '../main-rest-service';

@Injectable({
  providedIn: 'root'
})
export class RestSettingsService {
  api: string = 'settings/';

  constructor(private mainService: MainRestService) { }

  getSettings(): Observable<string> {
    return this.mainService.getLG(this.api);
  }
}
