import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PlayerClient } from '../../../models/interfaces';
import { ClientDataService } from '../services/client-data/client-data.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerComponent implements OnInit, OnDestroy {
  public player: PlayerClient | undefined;
  private subs: Subscription = new Subscription;

  constructor(private route: ActivatedRoute,
              private clientDataService: ClientDataService,
              private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.getPlayer();
  }
  getPlayer(): void {
    this.route.params.subscribe((params: Params) => {
      this.player = this.clientDataService.playersMap.get(params.id);
      console.log('player', this.player);
      this.cd.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
