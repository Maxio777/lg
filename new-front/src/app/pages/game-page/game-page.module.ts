import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GamePageRoutingModule} from './game-page-routing.module';
import {GamePageComponent} from './game-page/game-page.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [
    GamePageComponent
  ],
  imports: [
    CommonModule,
    GamePageRoutingModule,
    SharedModule,
  ]
})
export class GamePageModule {
}
