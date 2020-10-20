import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PlayerPageRoutingModule} from './player-page-routing.module';
import {PlayerPageComponent} from './player-page/player-page.component';
import {PlayerGamesComponent} from './components/player-games/player-games.component';
import {PlayerInfoComponent} from './components/player-info/player-info.component';
import {PlayerPercentsComponent} from './components/player-percents/player-percents.component';
import {PlayerStatisticsComponent} from './components/player-statistics/player-statistics.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [PlayerPageComponent, PlayerGamesComponent, PlayerInfoComponent, PlayerPercentsComponent, PlayerStatisticsComponent],
  imports: [
    CommonModule,
    PlayerPageRoutingModule,
    SharedModule
  ]
})
export class PlayerPageModule {
}
