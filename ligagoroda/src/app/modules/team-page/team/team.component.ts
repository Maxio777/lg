import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ClientDataService} from '../../client/services/client-data/client-data.service';
import {combineLatest, Subscription} from 'rxjs';
import {PlayerClient, TeamLG} from '../../../models/interfaces';
import {filter, pluck} from 'rxjs/operators';
import {GameLG} from '../../../models/game';
import {TeamTable} from '../../../models/team-table';

@Component({
  selector: 'app-team-page',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamComponent implements OnInit, OnDestroy {
  subs = new Subscription();
  team: TeamLG | undefined;
  teamStatistic: TeamTable | undefined;
  players: PlayerClient[] | undefined;
  games: GameLG[] | undefined;

  data$ = combineLatest(
    this.route.params.pipe(pluck('id')),
    this.clientDataService.getIsInitAppData()
  );

  constructor(private route: ActivatedRoute, private clientDataService: ClientDataService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.subs.add(this.data$.pipe(filter(([id, bool]) => id && bool))
      .subscribe(([id, _]) => {
        this.team = this.clientDataService.teamsMap.get(id);
        if (this.team) {
          this.games = this.clientDataService.getGames$().getValue()
            .filter(game => game.home._id === id || game.guest._id === id);
          this.players = [...this.team.players].map(_id => this.clientDataService.playersMap.get(_id));
        }
        this.teamStatistic = this.clientDataService.getTable$().getValue().find(team => team._id === id);
        this.cd.detectChanges();
      }));
  }


  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
