import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { GameLG } from '../../../../models/game';
import { PlayerClient, TournamentLG } from '../../../../models/interfaces';
import { PlayersService } from '../../../../services/players/players.service';
import { TableService } from '../../../../services/table/table.service';
import { TeamTable } from '../../../../models/team-table';
import { AllDataService } from '../../../../rest/all-data/all-data.service';
import { News } from '../../../../models/news';

@Injectable({
  providedIn: 'root'
})
export class ClientDataService {
  playersMap = new Map();
  gamesMap = new Map();
  initData$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  /** subjects */
  games: BehaviorSubject<GameLG[]> = new BehaviorSubject<GameLG[]>([]);
  players: BehaviorSubject<PlayerClient[]> = new BehaviorSubject<PlayerClient[]>([]);
  table: BehaviorSubject<TeamTable[]> = new BehaviorSubject<TeamTable[]>([]);
  news: BehaviorSubject<News[]> = new BehaviorSubject<News[]>([]);
  tournament: BehaviorSubject<TournamentLG | null> = new BehaviorSubject<TournamentLG | null>(null);

  constructor(private playersService: PlayersService,
              private tableService: TableService,
              private allDataService: AllDataService) { }

/** news */
  public setNews = (news: News[]): void => this.news.next(news);
  public getNews$ = (): BehaviorSubject<News[]>  => this.news;

/** games */
  public setGames = (games: GameLG[]): void => this.games.next(games);
  public getGames$ = (): BehaviorSubject<GameLG[]>  => this.games;

/** players */
  public setPlayers = (players: PlayerClient[]): void => this.players.next(players);
  public getPlayers$ = (): BehaviorSubject<PlayerClient[]>  => this.players;

/** table */
  public setTable = (players: TeamTable[]): void => this.table.next(players);
  public getTable$ = (): BehaviorSubject<TeamTable[]>  => this.table;

/** tournament */
  public setTournament = (tournament: TournamentLG | null): void => this.tournament.next(tournament);
  public getTournament$ = (): BehaviorSubject<TournamentLG | null>  => this.tournament;



  getAllData(id: string = ''): Observable<void> {
    return this.allDataService.getAllDataLG(id)
      .pipe(map(([games, players, news, tournament]) => {
        console.log(1, players.length);
        this.setNews(news);
        let pl: PlayerClient[] = [];
        if (players && players.length) {
          pl = this.playersService.addFieldsForPlayers(players, games);
          pl.forEach(p => this.playersMap.set(p._id, p));
        }

        if (games && games.length) {
          games.forEach(g => this.gamesMap.set(g._id, g));
        }
        this.setGames(games ? games : []);
        this.setPlayers(pl);
        this.setTable(games ? this.tableService.createTable(games) : []);
        this.setTournament(tournament);
        this.initData$.next(true);
        }
      ));
  }

  getIsInitAppData(): Observable<boolean> {
    return this.initData$.pipe(filter(data => data));
  }


}
