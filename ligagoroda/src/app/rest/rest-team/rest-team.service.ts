import { Injectable } from '@angular/core';
import { MainRestService } from '../main-rest-service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RestTeamService {
  apiLG: string = 'admin/team/';

  constructor(private mainRestService: MainRestService) { }

  getTeamLG(): Observable<any> {
    return this.mainRestService.getLG(this.apiLG);
  }

  updateTeamLG(body: string) {
    return this.mainRestService.putLG(body, this.apiLG);
  }

  postTeamLG(body: string) {
    return this.mainRestService.postLG(body, this.apiLG);
  }

  deleteTeamLG(idTeam: any) {
    return this.mainRestService.deleteLG(idTeam, this.apiLG + idTeam);
  }

}
