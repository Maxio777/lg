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

  getTournamentLG(): Observable<any> {
    return this.mainService.getLG(this.apiLG);
  }

  updateTournamentLG(body: string): any {
    return this.mainService.putLG(body, this.apiLG);
  }

  postTournamentLG(body: string): any {
    return this.mainService.postLG(body, this.apiLG);
  }

  deleteTournamentsLG(idTournament: any): any {
    return this.mainService.deleteLG(idTournament, this.apiLG);
  }

}
