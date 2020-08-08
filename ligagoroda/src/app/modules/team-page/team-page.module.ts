import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TeamPageRoutingModule} from './team-page-routing.module';
import {TeamComponent} from './team/team.component';
import {TeamInfoComponent} from './team-info/team-info.component';
import {TeamStatisticsComponent} from './team-statistics/team-statistics.component';
import { TeamPlayersComponent } from './team-players/team-players.component';
import { TeamGamesComponent } from './team-games/team-games.component';
import {SharedModule} from '../shared.module';
import {UiModule} from '../ui/ui.module';

@NgModule({
  declarations: [TeamComponent, TeamInfoComponent, TeamStatisticsComponent, TeamPlayersComponent, TeamGamesComponent],
  imports: [
    CommonModule,
    TeamPageRoutingModule,
    SharedModule,
    UiModule
  ]
})
export class TeamPageModule {
}
