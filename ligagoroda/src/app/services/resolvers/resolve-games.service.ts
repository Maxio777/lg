import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { RestTeamsService } from '../../rest/rest-teams/rest-teams.service';

@Injectable({
  providedIn: 'root'
})
export class ResolveGamesService implements Resolve<any> {

  constructor(private restTeamsService: RestTeamsService ) {

  }

  // @ts-ignore
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.restTeamsService.getTeam(route.params.id);
  }
}
