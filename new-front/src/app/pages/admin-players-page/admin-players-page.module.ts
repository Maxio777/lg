import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminPlayersPageRoutingModule} from './admin-players-page-routing.module';
import {AdminPlayersPageComponent} from './admin-players-page/admin-players-page.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [AdminPlayersPageComponent],
  imports: [
    CommonModule,
    AdminPlayersPageRoutingModule,
    SharedModule
  ]
})
export class AdminPlayersPageModule {
}
