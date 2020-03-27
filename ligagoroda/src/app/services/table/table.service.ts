import { Injectable } from '@angular/core';
import { GameLG } from '../../models/game';
import { TeamTable } from '../../models/team-table';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  getGames(id: string, games: GameLG[]): GameLG[] {
    return games.filter(game => ((game.home._id === id) || (game.guest._id === id)) && game.completed);
  }

  getWin(id: string, games: GameLG[]): GameLG[] {
    return games.filter(game =>
      ((game.guest._id === id) && (game.guestGoal > game.homeGoal))
      || ((game.home._id === id) && (game.homeGoal > game.guestGoal)) );
  }

  getDraws(games: GameLG[]): number {
    return games.filter(game => game.homeGoal === game.guestGoal ).length;
  }

  getLoss(id: string, games: GameLG[]): GameLG[] {
    return games.filter(game =>
      ((game.guest._id === id) && (game.guestGoal < game.homeGoal))
      || ((game.home._id === id) && (game.homeGoal < game.guestGoal)) );
  }

  getGoals(id: string, games: GameLG[]): number {
    let goals = 0;
    games.forEach(game => game.guest._id === id ? goals += game.guestGoal : goals += game.homeGoal);
    return goals;
  }

  getMissedGoals(id: string, games: GameLG[]): number {
    let goals = 0;
    games.forEach(game => game.guest._id === id ? goals += game.homeGoal : goals += game.guestGoal);
    return goals;
  }

  createTable(games: GameLG[]): TeamTable[] {
    const teams: TeamTable[] = [];
    games.forEach(game => {

      if (!teams.some((team: any) => (team._id === game.home._id))) {
        const team: TeamTable = new TeamTable(game.home);
        teams.push(team);
      }
      if (!teams.some((team: any) => (team._id === game.guest._id))) {
        const team: TeamTable = new TeamTable(game.guest);
        teams.push(team);
      }
    });

    teams.forEach(team => {
      const currentGames: GameLG[] = this.getGames(team._id, games);
      team.gamesCount = currentGames.length;
      team.win = this.getWin(team._id, currentGames).length;
      team.draws = this.getDraws(currentGames);
      team.loss = this.getLoss(team._id, currentGames).length;
      team.points = (team.win * 3) + team.draws;
      team.goals = this.getGoals(team._id, currentGames);
      team.missedGoals = this.getMissedGoals(team._id, currentGames);
      team.goalDifference = team.goals - team.missedGoals;
    });

    return teams.sort((aTeam, bTeam) => {
      if (aTeam.points > bTeam.points) { return -1; }
      if (aTeam.points < bTeam.points) { return 1; }
      if (aTeam.goalDifference > bTeam.goalDifference) { return -1; }
      if (aTeam.goalDifference < bTeam.goalDifference) { return 1; }
      return 0;
    });
  }

}
