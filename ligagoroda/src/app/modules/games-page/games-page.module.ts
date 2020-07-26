import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GamesPageRoutingModule} from './games-page-routing.module';
import {GamesPageComponent} from './games-page/games-page.component';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [GamesPageComponent],
  imports: [
    CommonModule,
    GamesPageRoutingModule,
    MatIconModule,
    FormsModule,
    MatButtonModule
  ]
})
export class GamesPageModule {
}
