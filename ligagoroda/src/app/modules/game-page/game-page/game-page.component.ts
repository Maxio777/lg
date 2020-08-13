import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {GameLG} from '../../../models/game';
import {combineLatest, Subscription} from 'rxjs';
import {filter, pluck} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {ClientDataService} from '../../client/services/client-data/client-data.service';

@Component({
  selector: 'app-game-page',
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
  game: GameLG | undefined;

  constructor(private route: ActivatedRoute, private clientDataService: ClientDataService, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.subs.add(this.data$.pipe(filter(([id, bool]) => id && bool))
      .subscribe(([id, _]) => {
        this.game = this.clientDataService.gamesMap.get(id);
        console.log(this.game);
        this.cd.detectChanges();
      }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
