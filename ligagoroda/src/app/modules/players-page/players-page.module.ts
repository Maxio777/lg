import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayersPageRoutingModule } from './players-page-routing.module';
import { PlayersComponent } from './players/players.component';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [PlayersComponent],
  imports: [
    CommonModule,
    PlayersPageRoutingModule,
    MatIconModule,
    FormsModule,
    MatButtonModule
  ]
})
export class PlayersPageModule { }
