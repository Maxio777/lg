import {Injectable} from '@angular/core';
import {PlayerClient, TeamLG, TournamentLG} from '@models/interfaces';
import {Game} from '@models/game/game';
import {Observable} from 'rxjs';
import {News, Tag} from '@models/news';
import {TeamTable} from '@models/team-table';
import {MainRestService} from '../main-rest-service/main-rest.service';


@Injectable()
export class DataRestService {
  apiLG = 'admin/current-tournament/';

  constructor(private mainRestService: MainRestService) {
  }

  getAllDataLG(id: string): Observable<[Game[], PlayerClient[], News[], TournamentLG, TeamTable[], TeamLG[], Tag[]]> {
    return this.mainRestService.getLG(this.apiLG + id);
  }

}
