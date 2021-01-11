import {Injectable} from '@angular/core';
import {MainRestService} from '@core/rest/main-rest-service/main-rest.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesRestService {
  apiLG = 'admin/game/';

  constructor(private mainRestService: MainRestService) {
  }

  getGame<T>(id = ''): Observable<T> {
    return this.mainRestService.getLG(this.apiLG + id);
  }

  updateGame(body: any, unit: string = ''): Observable<any> {
    return this.mainRestService.putLG(body, this.apiLG + unit);
  }

  postGame(body: any): Observable<any> {
    return this.mainRestService.postLG(body, this.apiLG);
  }

  deleteGame(id: string): Observable<any> {
    return this.mainRestService.deleteLG(this.apiLG + id);
  }
}
