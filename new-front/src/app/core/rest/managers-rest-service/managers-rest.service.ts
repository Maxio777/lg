import { Injectable } from '@angular/core';
import {MainRestService} from '@core/rest/main-rest-service/main-rest.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagersRestService {
  api = 'admin/manager/';

  constructor(private mainRestService: MainRestService) { }

  getManager(): Observable<any> {
    return this.mainRestService.getLG(this.api);
  }

  updateManager(body: any): Observable<any> {
    return this.mainRestService.putLG(body, this.api);
  }

  postManager(body: any): Observable<any> {
    return this.mainRestService.postLG(body, this.api);
  }


  deleteManager(id: string): Observable<any> {
    return this.mainRestService.deleteLG(this.api + id);
  }
}
