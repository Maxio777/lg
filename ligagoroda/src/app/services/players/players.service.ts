import { Injectable } from '@angular/core';
import { PlayerClient } from '../../models/interfaces';

import { GameLG } from '../../models/game';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  public addFieldsForPlayers(players: PlayerClient[], games: GameLG[]): PlayerClient[] {
    console.log('LLL', players.filter(p => p._id === '5e55aab4e6d2ea1112b9d3d0'));
    players.forEach((player) => {
      player.gamesCount = this.getPlayerGamesCount(player._id, games);
      player.goalsCount = this.getPlayerGoalsCount(player._id, games);
      player.assistsCount = this.getPlayerAssistCount(player._id, games);
      player.yellow = this.getYellowCount(player._id, games);
      player.red = this.getRedCount(player._id, games);
      player.goalsAssists = player.goalsCount + player.assistsCount;
      player.autoGoals = this.getAutoGoals(player._id, games);
      player.penalty = this.getPenalty(player._id, games);
      player.yellowReds = this.getYellowReds(player._id, games);
      player.games = this.getGames(player._id, games);
      player.teams = this.getTeams(player._id, games);
    });
    return players;
  }

  getPlayerGamesCount(id: string, games: GameLG[]): number {
    return games.filter(game => game.guestPlayers.filter(player => player._id === id).length
      || game.homePlayers.filter(player => player._id === id).length).length;
  }

  private getPlayerGoalsCount(id: string, games: GameLG[]): number {
    return games.filter(game => game.events.filter(event => event.owner._id === id
      && ['goal', '6mGoal', '10mGoal', 'penaltyGoal'].includes(event.type) ).length).length;
  }

  private getPlayerAssistCount(id: string, games: GameLG[]): number {
    return games.filter(game => game.events.filter(event => event.assistant._id === id
      && ['goal', '6mGoal', '10mGoal', 'penaltyGoal'].includes(event.type) ).length).length;
  }

  private getYellowCount(id: string, games: GameLG[]): number {
    return games.filter(game => game.events.filter(event => event.owner._id === id
      && ['yellow'].includes(event.type) ).length).length;
  }

  private getRedCount(id: string, games: GameLG[]): number {
    return games.filter(game => game.events.filter(event => event.owner._id === id
      && ['yellowRed'].includes(event.type) ).length).length;
  }

  private getAutoGoals(id: string, games: GameLG[]): number {
    return games.filter(game => game.events.filter(event => event.owner._id === id
      && ['autoGoal'].includes(event.type) ).length).length;
  }

  private getPenalty(id: string, games: GameLG[]): number {
    return games.filter(game => game.events.filter(event => event.owner._id === id
      && ['penalty'].includes(event.type) ).length).length;
  }

  private getYellowReds(id: string, games: GameLG[]): number {
    return games.filter(game => game.events.filter(event => event.owner._id === id
      && ['yellowRed'].includes(event.type) ).length).length;
  }

  private getGames(id: string, games: GameLG[]): GameLG[] {
    return games.filter(game => [...game.guestPlayers, ...game.homePlayers].some(player => player._id === id));
  }

  private getTeams(id: string, games: GameLG[]) {
    const teams: {_id: string, name: string, img: string }[] = [];
    games.forEach(game => {
      if (game.guest.players.some(player => player._id === id) && !teams.some(team => team._id === game.guest._id)) {
        const { _id, name, img } = game.guest;
        teams.push({ _id, name, img });
      }
      if (game.home.players.some(player => player._id === id) && !teams.some(team => team._id === game.home._id)) {
        const { _id, name, img } = game.home;
        teams.push({ _id, name, img });
      }
    });
    return teams;
  }

}
