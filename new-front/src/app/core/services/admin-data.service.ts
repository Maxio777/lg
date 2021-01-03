import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {TournamentLG} from '@models/interfaces';
import {filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {
  tournaments: BehaviorSubject<TournamentLG[]> = new BehaviorSubject<TournamentLG[]>([]);


  /** tournaments */
  public setTournaments = (tournaments: TournamentLG[]) => this.tournaments.next(tournaments);
  public getTournaments$ = (): Observable<TournamentLG[]>  => this.tournaments.pipe(filter(v => !!v.length));
}
