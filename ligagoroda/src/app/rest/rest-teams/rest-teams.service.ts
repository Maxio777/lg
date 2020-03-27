import { Injectable } from '@angular/core';
import { MainRestService } from '../main-rest-service';

@Injectable({
  providedIn: 'root'
})
export class RestTeamsService {
  apiTeam: string = 'admin/team/';

  constructor(private mainRestService: MainRestService) {}

  getTeam(id: number) {
    return this.mainRestService.getLG(this.apiTeam + id.toString());
  }

}
