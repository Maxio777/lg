import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GamesPageRoutingModule} from './games-page-routing.module';
import {GamesPageComponent} from './games-page/games-page.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [GamesPageComponent],
  imports: [
    CommonModule,
    GamesPageRoutingModule,
    SharedModule
  ]
})
export class GamesPageModule {
}
