import {Injectable} from '@angular/core';
import {MainRestService} from '../main-rest-service';
import {Observable} from 'rxjs';
import {PlayerAdmin} from '../../models/interfaces';


@Injectable({
  providedIn: 'root'
})
export class RestPlayersService {
  api: string = 'players/';
  apiLG: string = 'admin/player/';

  constructor(private mainRestService: MainRestService) {
  }

  getPlayerLG(): Observable<any> {
    return this.mainRestService.getLG(this.apiLG);
  }

  postPlayerLG(body: string) {
    return this.mainRestService.postLG(body, this.apiLG);
  }

  deletePlayerLG(idPlayer: any) {
    return this.mainRestService.deleteLG(idPlayer, this.apiLG);
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
      fd.append('birthday', data.middleName);
    }
    fd.append('firstName', data.firstName);
    fd.append('lastName', data.lastName);

    return this.mainRestService.putLG2(fd, this.apiLG + id + '?kind=' + kind);
  }


}
