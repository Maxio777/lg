import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminDataService } from './services/admin-data/admin-data.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent implements OnInit, OnDestroy {
  subs: Subscription = new Subscription();

  constructor(
    private adminDataService: AdminDataService,
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.subs.add(this.dataService.currentTournamentID.subscribe(() => {
      this.subs.add(this.adminDataService.getAllData().subscribe());
    }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
