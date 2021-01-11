import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {MainRestService} from '@core/rest/main-rest-service/main-rest.service';

@Injectable({
  providedIn: 'root'
})
export class TeamsRestService {
  apiLG = 'admin/team/';

  constructor(private mainRestService: MainRestService) { }

  getTeams(): Observable<any> {
    return this.mainRestService.getLG(this.apiLG);
  }

  updateTeam(body: string): Observable<any> {
    return this.mainRestService.putLG(body, this.apiLG);
  }

  postTeam(body: string): Observable<any> {
    return this.mainRestService.postLG(body, this.apiLG);
  }

  deleteTeam(id: any): Observable<any> {
    return this.mainRestService.deleteLG(this.apiLG + id);
  }

}
