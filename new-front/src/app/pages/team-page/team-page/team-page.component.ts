import {Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {combineLatest, Subscription} from 'rxjs';
import {PlayerClient, TeamLG} from '@models/interfaces';
import {TeamTable} from '@models/team-table';
import {GameLG} from '@models/game';
import {filter, pluck} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {ClientDataService} from '@core/services/client-data-service/client-data.service';


@Component({
  selector: 'lg-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamPageComponent implements OnInit, OnDestroy {
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

  ngOnInit(): void {
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
        console.log(this.players);
      }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
