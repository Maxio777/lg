import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PlayersPageRoutingModule} from './players-page-routing.module';
import {PlayersPageComponent} from './players-page/players-page.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [PlayersPageComponent],
  imports: [
    CommonModule,
    PlayersPageRoutingModule,
    SharedModule
  ]
})
export class PlayersPageModule {
}
