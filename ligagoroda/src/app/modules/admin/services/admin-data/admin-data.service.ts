import {Injectable} from '@angular/core';
import {BehaviorSubject, forkJoin, Observable} from 'rxjs';
import {ManagerLG, PlayerAdmin, Referee, TeamLG, TournamentLG} from '../../../../models/interfaces';
import {GameLG} from '../../../../models/game';
import {RestPlayersService} from '../../../../rest/rest-players/rest-players.service';
import {RestManagerService} from '../../../../rest/rest-manager/rest-manager.service';
import {RestGameService} from '../../../../rest/rest-game/rest-game.service';
import {RestRefereeService} from '../../../../rest/rest-referee/rest-referee.service';
import {map} from 'rxjs/operators';
import {RestTournamentsService} from '../../../../rest/rest-tournaments/rest-tournaments.service';
import {RestTeamService} from '../../../../rest/rest-team/rest-team.service';
import {News, Tag} from '../../../../models/news';
import {RestNewsService} from '../../../../rest/rest-news/rest-news.service';
import {TagsRestService} from '../../../../rest/tags-rest/tags-rest.service';

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {
  games$ = this.restGameService.getGameLG();
  players$ = this.restPlayersService.getPlayerLG();
  news$ = this.restNewsService.getNewsLG();
  tags$ = this.tagsRestService.getTagsLG();

  players: BehaviorSubject<PlayerAdmin[]> = new BehaviorSubject<PlayerAdmin[]>([]);
  managers: BehaviorSubject<ManagerLG[]> = new BehaviorSubject<ManagerLG[]>([]);
  games: BehaviorSubject<GameLG[]> = new BehaviorSubject<GameLG[]>([]);
  referees: BehaviorSubject<Referee[]> = new BehaviorSubject<Referee[]>([]);
  tournaments: BehaviorSubject<TournamentLG[]> = new BehaviorSubject<TournamentLG[]>([]);
  teams: BehaviorSubject<TeamLG[]> = new BehaviorSubject<TeamLG[]>([]);
  news: BehaviorSubject<News[]> = new BehaviorSubject<News[]>([]);
  tags: BehaviorSubject<Tag[]> = new BehaviorSubject<Tag[]>([]);

  constructor(private restPlayersService: RestPlayersService,
              private restManagerService: RestManagerService,
              private restGameService: RestGameService,
              private restRefereeService: RestRefereeService,
              private restTournamentsService: RestTournamentsService,
              private restTeamService: RestTeamService,
              private restNewsService: RestNewsService,
              private tagsRestService: TagsRestService
  ) {
  }

  /** news */
  public setTags = (tags: Tag[]): void => this.tags.next(tags);
  public getTags$ = (): BehaviorSubject<Tag[]> => this.tags;

  /** news */
  public setNews = (news: News[]): void => this.news.next(news);
  public getNews$ = (): BehaviorSubject<News[]> => this.news;

  /** players */
  public setPlayers = (players: PlayerAdmin[]) => this.players.next(players);
  public getPlayers$ = (): Observable<PlayerAdmin[]> => this.players;

  /** managers */
  public setManagers = (managers: ManagerLG[]) => this.managers.next(managers);
  public getManagers$ = (): Observable<ManagerLG[]> => this.managers;

  /** games-page */
  public setGames = (games: GameLG[]) => this.games.next(games);
  public getGames$ = (): Observable<GameLG[]> => this.games;

  /** referees */
  public setReferees = (referees: Referee[]) => this.referees.next(referees);
  public getReferees$ = (): Observable<Referee[]> => this.referees;

  /** tournaments */
  public setTournaments = (tournaments: TournamentLG[]) => this.tournaments.next(tournaments);
  public getTournaments$ = (): Observable<TournamentLG[]> => this.tournaments;

  /** teams */
  public setTeams = (teams: TeamLG[]) => this.teams.next(teams);
  public getTeams$ = (): Observable<TeamLG[]> => this.teams;

  /**
   * Получить все данные
   */
  getAllData() {
    return forkJoin(
      this.restRefereeService.getRefereeLG(),
      this.restPlayersService.getPlayerLG(),
      this.restManagerService.getManagerLG(),
      this.restGameService.getGameLG(),
      this.restTournamentsService.getTournamentLG(),
      this.restTeamService.getTeamLG(),
      this.restNewsService.getNewsLG(),
      this.tagsRestService.getTagsLG()
    )
      .pipe(map(
        ([referees, players, managers, games, tournaments, teams, news, tags]) => {
          this.setReferees(referees);
          this.setPlayers(players);
          this.setManagers(managers);
          this.setGames(games);
          this.setTournaments(tournaments);
          this.setTeams(teams);
          this.setNews(news);
          this.setTags(tags);
        }
      ));
  }

  getGames() {
    return this.games$.pipe(map(games => this.setGames(games)));
  }

  getPlayers() {
    return this.players$.pipe(map(players => this.setPlayers(players)));
  }
}




