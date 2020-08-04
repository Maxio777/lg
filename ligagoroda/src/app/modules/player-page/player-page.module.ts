import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PlayerPageRoutingModule} from './player-page-routing.module';
import {PlayerComponent} from './player/player.component';
import {UiModule} from '../ui/ui.module';
import {PlayerInfoComponent} from './player-info/player-info.component';
import {PlayerStatisticsComponent} from './player-statistics/player-statistics.component';
import {PlayerPercentsComponent} from './player-percents/player-percents.component';
import {PlayerGamesComponent} from './player-games/player-games.component';
import {SharedModule} from '../shared.module';

@NgModule({
  declarations: [
    PlayerComponent,
    PlayerInfoComponent,
    PlayerStatisticsComponent,
    PlayerPercentsComponent,
    PlayerGamesComponent
  ],
  imports: [
    CommonModule,
    PlayerPageRoutingModule,
    UiModule,
    SharedModule
  ]
})
export class PlayerPageModule {
}
