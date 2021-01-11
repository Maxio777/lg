import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminTeamPageRoutingModule } from './admin-team-page-routing.module';
import { AdminTeamPageComponent } from './admin-team-page/admin-team-page.component';


@NgModule({
  declarations: [AdminTeamPageComponent],
  imports: [
    CommonModule,
    AdminTeamPageRoutingModule
  ]
})
export class AdminTeamPageModule { }
