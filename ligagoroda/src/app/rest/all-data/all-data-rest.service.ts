import { Injectable } from '@angular/core';
import { PlayerClient, TeamLG, TournamentLG } from '../../models/interfaces';
import { GameLG } from '../../models/game';
import { MainRestService } from '../main-rest-service';
import { Observable } from 'rxjs';
import { News } from '../../models/news';
import { TeamTable } from '../../models/team-table';


@Injectable({
  providedIn: 'root'
})
export class AllDataRestService {
  apiLG: string = 'admin/current-tournament/';

  constructor(private mainRestService: MainRestService) { }

  getAllDataLG(id: string): Observable<[ GameLG[], PlayerClient[], News[], TournamentLG, TeamTable[], TeamLG[] ]> {
    return this.mainRestService.getLG(this.apiLG + id);
  }

}
