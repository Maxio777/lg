import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MainRestService } from '../main-rest-service';


@Injectable({
  providedIn: 'root'
})
export class RestTournamentsService {
  apiLG: string = 'admin/tournaments/';

  constructor(private mainService: MainRestService) { }

  getTournamentLG(): Observable<any> {
    return this.mainService.getLG(this.apiLG);
  }

  updateTournamentLG(body: string) {
    return this.mainService.putLG(body, this.apiLG);
  }

  postTournamentLG(body: string) {
    return this.mainService.postLG(body, this.apiLG);
  }

  deleteTournamentsLG(idTournament: any) {
    return this.mainService.deleteLG(idTournament, this.apiLG);
  }

}
