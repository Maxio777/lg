import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
// import {Router} from '@angular/router';
import {ClientDataService} from '../../client/services/client-data/client-data.service';
import {TeamTable} from '../../../models/team-table';
import {TournamentLG} from '../../../models/interfaces';
import {COLORS} from '../../../assets/constants/constants';

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablePageComponent implements OnInit {
  COLORS = COLORS;
  table: TeamTable[] | undefined = undefined;
  currentTournament: TournamentLG | null = null;

  constructor(
    // private router: Router,
              public clientDataService: ClientDataService,
              private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.clientDataService.getTournament$().subscribe(tournament => {
      this.currentTournament = tournament;
      this.cd.detectChanges();
    });
  }

}
