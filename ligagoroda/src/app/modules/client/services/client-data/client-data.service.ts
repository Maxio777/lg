import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, filter} from 'rxjs/operators';
import {GameLG} from '../../../../models/game';
import {PlayerClient, TeamLG, TournamentLG} from '../../../../models/interfaces';
import {TeamTable} from '../../../../models/team-table';
import {AllDataRestService} from '../../../../rest/all-data/all-data-rest.service';
import {News, Tag} from '../../../../models/news';

@Injectable({
  providedIn: 'root'
})
export class ClientDataService {
  playersMap = new Map();
  gamesMap = new Map();
  teamsMap = new Map();
  initData$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  /** subjects */
  tags: BehaviorSubject<Tag[]> = new BehaviorSubject<Tag[]>([]);
  games: BehaviorSubject<GameLG[]> = new BehaviorSubject<GameLG[]>([]);
  players: BehaviorSubject<PlayerClient[]> = new BehaviorSubject<PlayerClient[]>([]);
  table: BehaviorSubject<TeamTable[]> = new BehaviorSubject<TeamTable[]>([]);
  news: BehaviorSubject<News[]> = new BehaviorSubject<News[]>([]);
  tournament: BehaviorSubject<TournamentLG | null> = new BehaviorSubject<TournamentLG | null>(null);
  teams: BehaviorSubject<TeamLG[] | null> = new BehaviorSubject<TeamLG[] | null>(null);

  constructor(private allDataRestService: AllDataRestService) {
  }

  /** news-page */
  public setTags = (tags: Tag[]): void => this.tags.next(tags);
  public getTags$ = (): BehaviorSubject<Tag[]> => this.tags;

  /** news-page */
  public setNews = (news: News[]): void => this.news.next(news);
  public getNews$ = (): BehaviorSubject<News[]> => this.news;

  /** games */
  public setGames = (games: GameLG[]): void => this.games.next(games);
  public getGames$ = (): BehaviorSubject<GameLG[]> => this.games;

  /** players */
  public setPlayers = (players: PlayerClient[]): void => this.players.next(players);
  public getPlayers$ = (): BehaviorSubject<PlayerClient[]> => this.players;

  /** table */
  public setTable = (players: TeamTable[]): void => this.table.next(players);
  public getTable$ = (): BehaviorSubject<TeamTable[]> => this.table;

  /** tournament */
  public setTournament = (tournament: TournamentLG | null): void => this.tournament.next(tournament);
  public getTournament$ = (): BehaviorSubject<TournamentLG | null> => this.tournament;

  /** teams */
  public setTeams = (teams: TeamLG[] | null): void => this.teams.next(teams);
  public getTeams$ = (): BehaviorSubject<TeamLG[] | null> => this.teams;


  getAllData(id: string = ''): Observable<void> {
    return this.allDataRestService.getAllDataLG(id)
      .pipe(map(([games, players, news, tournament, table, teams, tags]) => {
          this.setNews(news);
          if (players && players.length) {
            players.forEach(p => this.playersMap.set(p._id, p));
          }
          if (games && games.length) {
            games.forEach(g => this.gamesMap.set(g._id, g));
          }
          if (teams && teams.length) {
            teams.forEach(t => this.teamsMap.set(t._id, t));
          }
          this.setGames(games ? games : []);
          this.setPlayers(players);
          this.setTable(table);
          this.setTournament(tournament);
          this.setTeams(teams);
          this.setTags(tags);
          this.initData$.next(true);
        }
      ));
  }

  public getIsInitAppData(): Observable<boolean> {
    return this.initData$.pipe(filter(data => data));
  }
}



export function init(provider: ClientDataService) {
  return () => provider.getAllData().subscribe();
}
