import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GamePageRoutingModule} from './game-page-routing.module';
import {GamePageComponent} from './game-page/game-page.component';
import {GoalsComponent} from './components/goals/goals.component';
import {LineupsComponent} from './components/lineups/lineups.component';
import {MatchInfoComponent} from './components/match-info/match-info.component';
import {PunishmentsComponent} from './components/punishments/punishments.component';
import {TeamNameComponent} from './components/team-name/team-name.component';
import {SharedModule} from '../../shared/shared.module';
import {MatchScoreComponent} from './components/match-info/match-score/match-score.component';
import {RefereesComponent} from './components/match-info/referees/referees.component';
import {TourDateCompletedComponent} from './components/match-info/tour-date-completed/tour-date-completed.component';


@NgModule({
  declarations: [
    GamePageComponent,
    GoalsComponent,
    LineupsComponent,
    MatchInfoComponent,
    PunishmentsComponent,
    TeamNameComponent,
    MatchScoreComponent,
    RefereesComponent,
    TourDateCompletedComponent],
  imports: [
    CommonModule,
    GamePageRoutingModule,
    SharedModule
  ]
})
export class GamePageModule {
}
