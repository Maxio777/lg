import {TeamLG} from './interfaces';

export class TeamTable {
  _id = '';
  teamName = '';
  img = '';
  gamesCount = 0;
  win = 0;
  draws = 0;
  loss = 0;
  points = 0;
  goals = 0;
  missedGoals = 0;
  goalDifference = 0;
  outcomes: number[] = [];
  isLoading = false;

  constructor(team: TeamLG) {
    this._id = team._id;
    this.teamName = team.name;
    this.img = team.img;
  }
}
