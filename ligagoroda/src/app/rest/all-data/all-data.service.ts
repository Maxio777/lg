import { Injectable } from '@angular/core';
import { PlayerClient } from '../../models/interfaces';
import { GameLG } from '../../models/game';
import { MainRestService } from '../main-rest-service';
import { Observable } from 'rxjs';
import { News } from '../../models/news';

@Injectable({
  providedIn: 'root'
})
export class AllDataService {
  apiLG: string = 'admin/current-tournament/';

  constructor(private mainRestService: MainRestService) { }

  getAllDataLG(id: string): Observable<[GameLG[], PlayerClient[], News[]]> {
    return this.mainRestService.getLG(this.apiLG + id);
  }
}
