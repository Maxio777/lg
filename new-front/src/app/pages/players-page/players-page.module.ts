import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PlayersPageRoutingModule} from './players-page-routing.module';
import {PlayersPageComponent} from './players-page/players-page.component';
import {SharedModule} from '../../shared/shared.module';
import {PlayersPageSkeletonComponent} from './players-page/players-page-skeleton/players-page-skeleton.component';


@NgModule({
  declarations: [PlayersPageComponent, PlayersPageSkeletonComponent],
  imports: [
    CommonModule,
    PlayersPageRoutingModule,
    SharedModule
  ]
})
export class PlayersPageModule {
}
