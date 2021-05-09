import {Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {combineLatest, Subscription} from 'rxjs';
import {PlayerClient} from '@models/interfaces';
import {ActivatedRoute} from '@angular/router';
import {ClientDataService} from '@core/services/client-data-service/client-data.service';
import {filter, pluck} from 'rxjs/operators';


@Component({
  selector: 'lg-player-page',
  templateUrl: './player-page.component.html',
  styleUrls: ['./player-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerPageComponent implements OnInit, OnDestroy {
  subs = new Subscription();
  player: PlayerClient | undefined;

  data$ = combineLatest(
    this.route.params.pipe(pluck('id')),
    this.clientDataService.getIsInitAppData()
  );

  constructor(private route: ActivatedRoute, private clientDataService: ClientDataService, private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.subs.add(this.data$.pipe(filter(([id, bool]) => id && bool))
      .subscribe(([id, _]) => {
        this.player = this.clientDataService.playersMap.get(id);
        console.log(this.player);
        this.cd.detectChanges();
      }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
