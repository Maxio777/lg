import { Injectable } from '@angular/core';
import {MainRestService} from '@core/rest/main-rest-service/main-rest.service';
import {Observable} from 'rxjs';
import {PlayerAdmin} from '@models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PlayersRestService {
  readonly api = 'players/';
  readonly apiLG = 'admin/player/';

  constructor(private mainRestService: MainRestService) {
  }

  getPlayerLG(): Observable<any> {
    return this.mainRestService.getLG(this.apiLG);
  }

  postPlayerLG(body: string): Observable<any> {
    return this.mainRestService.postLG(body, this.apiLG);
  }

  deletePlayerLG(id: any): Observable<any> {
    return this.mainRestService.deleteLG(this.apiLG + id);
  }

  updatePlayer(data: PlayerAdmin, image: File | null, kind: string, id: string): Observable<any> {
    const fd = new FormData();

    if (image) {
      fd.append('image', image, image.name);
    }
    if (data.birthday) {
      fd.append('birthday', data.birthday);
    }
    if (data.middleName) {
      fd.append('middleName', data.middleName);
    }
    fd.append('firstName', data.firstName);
    fd.append('lastName', data.lastName);

    return this.mainRestService.putLG2(fd, this.apiLG + id + '?kind=' + kind);
  }


}
