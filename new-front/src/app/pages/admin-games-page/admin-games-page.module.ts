import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminGamesPageRoutingModule } from './admin-games-page-routing.module';
import { AdminGamesPageComponent } from './admin-games-page/admin-games-page.component';


@NgModule({
  declarations: [AdminGamesPageComponent],
  imports: [
    CommonModule,
    AdminGamesPageRoutingModule
  ]
})
export class AdminGamesPageModule { }
