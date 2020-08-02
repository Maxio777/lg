import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerPageRoutingModule } from './player-page-routing.module';
import { PlayerComponent } from './player/player.component';

@NgModule({
  declarations: [PlayerComponent],
  imports: [
    CommonModule,
    PlayerPageRoutingModule
  ]
})
export class PlayerPageModule { }
