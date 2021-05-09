import {Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {Subscription, combineLatest} from 'rxjs';
import {filter, pluck} from 'rxjs/operators';
import {Game} from '@models/game/game';
import {ActivatedRoute} from '@angular/router';
import {ClientDataService} from '@core/services/client-data-service/client-data.service';


@Component({
  selector: 'lg-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamePageComponent implements OnInit, OnDestroy {
  subs = new Subscription();

  data$ = combineLatest(
    this.route.params.pipe(pluck('id')),
    this.clientDataService.getIsInitAppData()
  );
  game: Game | undefined;

  constructor(private route: ActivatedRoute, private clientDataService: ClientDataService, private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.subs.add(this.data$.pipe(filter(([id, bool]) => id && bool))
      .subscribe(([id, _]) => {
        this.game = this.clientDataService.gamesMap.get(id);
        this.cd.detectChanges();
      }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
