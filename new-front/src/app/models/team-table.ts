import { TeamLG } from './interfaces';

export class TeamTable {
  _id: string = '';
  teamName: string = '';
  img: string = '';
  gamesCount: number = 0;
  win: number = 0;
  draws: number = 0;
  loss: number = 0;
  points: number = 0;
  goals: number = 0;
  missedGoals: number = 0;
  goalDifference: number = 0;
  outcomes: number[] = [];

  constructor(team: TeamLG) {
    this._id = team._id;
    this.teamName = team.name;
    this.img = team.img;
  }
}
