import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminGamePageRoutingModule} from './admin-game-page-routing.module';
import {AdminGamePageComponent} from './admin-game-page/admin-game-page.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [AdminGamePageComponent],
  imports: [
    CommonModule,
    AdminGamePageRoutingModule,
    SharedModule
  ]
})
export class AdminGamePageModule {
}
