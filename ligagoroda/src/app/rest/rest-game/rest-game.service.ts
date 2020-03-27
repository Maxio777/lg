import { Injectable } from '@angular/core';
import { MainRestService } from '../main-rest-service';
import { Observable } from 'rxjs';
import { GameLG } from '../../models/game';


@Injectable({
  providedIn: 'root'
})
export class RestGameService {
  apiLG: string = 'admin/game/';

  constructor(private mainRestService: MainRestService) {
  }

  getGameLG(): Observable<GameLG[]> {
    return this.mainRestService.getLG(this.apiLG);
  }

  updateGameLG(body: any, unit: string = ''): Observable<any> {
    return this.mainRestService.putLG(body, this.apiLG + unit);
  }

  postGameLG(body: any): Observable<any> {
    return this.mainRestService.postLG(body, this.apiLG);
  }

  deleteGameLG(idGame: string): Observable<any> {
    return this.mainRestService.deleteLG(idGame, this.apiLG + idGame);
  }
}
