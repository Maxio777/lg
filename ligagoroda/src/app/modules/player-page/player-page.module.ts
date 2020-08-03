import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PlayerPageRoutingModule} from './player-page-routing.module';
import {PlayerComponent} from './player/player.component';
import {UiModule} from '../ui/ui.module';

@NgModule({
  declarations: [PlayerComponent],
  imports: [
    CommonModule,
    PlayerPageRoutingModule,
    UiModule
  ]
})
export class PlayerPageModule {
}
