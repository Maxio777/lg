import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {ClientDataService} from '@core/client-data-service/client-data.service';
import {COLORS} from '@assets/constants/constants';
import {Router} from '@angular/router';
import {TeamTable} from '@models/team-table';
import {TournamentLG} from '@models/interfaces';


@Component({
  selector: 'lg-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablePageComponent implements OnInit {
  colors = COLORS;
  table: TeamTable[] | undefined = undefined;
  currentTournament: TournamentLG | null = null;
  loadImg = false;

  constructor(
    private router: Router,
    public clientDataService: ClientDataService,
    private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.clientDataService.getTournament$().subscribe(tournament => {
      this.currentTournament = tournament;
      this.cd.detectChanges();
    });
  }

}
