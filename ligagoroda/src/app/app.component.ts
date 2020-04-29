import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
// import { RestSettingsService } from './rest/rest-settings/rest-settings.service';
// import { DataService } from './services/data.service';
import { Subscription } from 'rxjs';
import { ClientDataService } from './modules/client/services/client-data/client-data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent implements OnInit {
  subs: Subscription = new Subscription();

  constructor(
              // private settingsService: RestSettingsService,
              // private dataService: DataService,
              private clientDataService: ClientDataService) {}

  ngOnInit(): void {
    // this.getSettings();
    this.getAllClientData();
  }

  // getSettings() {
  //   this.settingsService.getSettings()
  //     .subscribe(idTournament => this.dataService.currentTournamentID.next(idTournament));
  // }

  getAllClientData() {

    this.clientDataService.getAllData().subscribe()

    // this.subs.add(this.dataService.currentTournamentID.subscribe((id) => {
    //   if (id) {
    //     this.subs.add(this.clientDataService.getAllData(id).subscribe());
    //   }
    // }));
  }
}
