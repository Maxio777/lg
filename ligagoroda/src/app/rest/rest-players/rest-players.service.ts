import { Injectable } from '@angular/core';
import { MainRestService } from '../main-rest-service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RestPlayersService {
  api: string = 'players/';
  apiLG: string = 'admin/player/';

  constructor(private mainRestService: MainRestService) { }

  getPlayerLG(): Observable<any> {
    return this.mainRestService.getLG(this.apiLG);
  }

  updatePlayerLG(body: string) {
    return this.mainRestService.putLG(body, this.apiLG);
  }

  postPlayerLG(body: string) {
    return this.mainRestService.postLG(body, this.apiLG);
  }

  deletePlayerLG(idPlayer: any) {
    return this.mainRestService.deleteLG(idPlayer, this.apiLG + idPlayer);
  }


}
