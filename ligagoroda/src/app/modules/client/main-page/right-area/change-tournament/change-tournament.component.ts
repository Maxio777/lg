import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../../../../services/title/title.service';
import { MatSelectChange } from '@angular/material/select';
import { RestTournamentsService } from '../../../../../rest/rest-tournaments/rest-tournaments.service';
import { TournamentLG } from '../../../../../models/interfaces';

@Component({
  selector: 'app-change-tournament',
  templateUrl: './change-tournament.component.html',
  styleUrls: ['./change-tournament.component.scss']
})
export class ChangeTournamentComponent implements OnInit {
  tournaments: TournamentLG[] = [];

  constructor(
    private dataService: TitleService,
    private restTournamentsService: RestTournamentsService,
  ) {}

  ngOnInit() {
    this.getTournaments();
  }

  getTournaments() {
    return this.restTournamentsService.getTournamentLG()
      .subscribe(tournaments => this.tournaments = tournaments);
  }

  changeTournament(event: MatSelectChange) {
    this.dataService.setCurrentTournamentID(event.value);
  }

  get currentTournamentId() {
    return this.dataService.currentTournamentID;
  }

}
