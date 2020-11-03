import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, Input} from '@angular/core';
import {TeamTable} from '@models/team-table';
import {ClientDataService} from '@core/client-data-service/client-data.service';
import {Subscription} from 'rxjs';
import {TournamentLG} from '@models/interfaces';
import {COLORS} from '@assets/constants/constants';


@Component({
  selector: 'lg-side-table',
  templateUrl: './side-table.component.html',
  styleUrls: ['./side-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideTableComponent implements OnInit, OnDestroy {
  @Input() isShow = false;

  colors = COLORS;
  table: TeamTable[] | undefined = undefined;
  currentTournament: TournamentLG | null = null;
  subs: Subscription = new Subscription();
  isLoad = false;

  constructor(
    public clientDataService: ClientDataService,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.subs.add(this.clientDataService.getTable$().subscribe(table => {
      this.table = table;
    }));
    this.subs.add(this.clientDataService.getTournament$().subscribe(tournament => {
      this.currentTournament = tournament;
      this.cd.detectChanges();
    }));
  }

  changeLoadStatus(t: TeamTable): void {
    t.isLoading = false;
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}

