import { Injectable } from '@angular/core';
import {MainRestService} from '@core/rest/main-rest-service/main-rest.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefereesRestService {
  api = 'admin/referee/';

  constructor(private mainService: MainRestService) { }

  getRefereeLG(): Observable<any> {
    return this.mainService.getLG(this.api);
  }

  updateRefereeLG(body: string): Observable<any> {
    return this.mainService.putLG(body, this.api);
  }

  postRefereeLG(body: string): Observable<any> {
    return this.mainService.postLG(body, this.api);
  }


  deleteRefereeLG(id: string): Observable<any> {
    return this.mainService.deleteLG(this.api + id);
  }
}
