import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GamePageRoutingModule} from './game-page-routing.module';
import {GamePageComponent} from './game-page/game-page.component';
import {UiModule} from '../ui/ui.module';
import {TeamNameComponent} from './team-name/team-name.component';
import {MatchInfoComponent} from './match-info/match-info.component';
import {TourDateCompletedComponent} from './match-info/tour-date-completed/tour-date-completed.component';
import {MatchScoreComponent} from './match-info/match-score/match-score.component';
import {RefereesComponent} from './match-info/referees/referees.component';
import {LineupsComponent} from './lineups/lineups.component';
import {GoalsComponent} from './goals/goals.component';
import {PunishmentsComponent} from './punishments/punishments.component';

@NgModule({
  declarations: [
    GamePageComponent,
    TeamNameComponent,
    MatchInfoComponent,
    TourDateCompletedComponent,
    MatchScoreComponent,
    RefereesComponent,
    LineupsComponent,
    GoalsComponent,
    PunishmentsComponent
  ],
  imports: [
    CommonModule,
    GamePageRoutingModule,
    UiModule
  ]
})
export class GamePageModule {
}
