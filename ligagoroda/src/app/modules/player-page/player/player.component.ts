import {Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {pluck, filter} from 'rxjs/operators';
import {combineLatest, Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {PlayerClient} from '../../../models/interfaces';
import {ClientDataService} from '../../client/services/client-data/client-data.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerComponent implements OnInit, OnDestroy {
  subs = new Subscription();
  player: PlayerClient | undefined;

  data$ = combineLatest(
    this.route.params.pipe(pluck('id')),
    this.clientDataService.getIsInitAppData()
  );

  constructor(private route: ActivatedRoute, private clientDataService: ClientDataService, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.subs.add(this.data$.pipe(filter(([id, bool]) => id && bool))
      .subscribe(([id, _]) => {
        this.player = this.clientDataService.playersMap.get(id);
        this.cd.detectChanges();
      }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
