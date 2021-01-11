import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {MainRestService} from '@core/rest/main-rest-service/main-rest.service';

@Injectable({
  providedIn: 'root'
})
export class RestTournamentService {
  apiLG = 'admin/tournaments/';

  constructor(private mainService: MainRestService) {
  }

  getTournament(): Observable<any> {
    return this.mainService.getLG(this.apiLG);
  }

  updateTournament(body: string): Observable<any> {
    return this.mainService.putLG(body, this.apiLG);
  }

  postTournament(body: string): Observable<any> {
    return this.mainService.postLG(body, this.apiLG);
  }

  deleteTournaments(id: string): Observable<any> {
    return this.mainService.deleteLG(this.apiLG + id);
  }

}
