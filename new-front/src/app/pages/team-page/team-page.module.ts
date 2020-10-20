import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TeamPageRoutingModule} from './team-page-routing.module';
import {TeamPageComponent} from './team-page/team-page.component';
import {TeamGamesComponent} from './components/team-games/team-games.component';
import {TeamInfoComponent} from './components/team-info/team-info.component';
import {TeamPlayersComponent} from './components/team-players/team-players.component';
import {TeamStatisticsComponent} from './components/team-statistics/team-statistics.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [TeamPageComponent, TeamGamesComponent, TeamInfoComponent, TeamPlayersComponent, TeamStatisticsComponent],
  imports: [
    CommonModule,
    TeamPageRoutingModule,
    SharedModule
  ]
})
export class TeamPageModule {
}
