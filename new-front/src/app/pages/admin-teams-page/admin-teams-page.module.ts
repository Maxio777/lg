import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminTeamsPageRoutingModule } from './admin-teams-page-routing.module';
import { AdminTeamsPageComponent } from './admin-teams-page/admin-teams-page.component';


@NgModule({
  declarations: [AdminTeamsPageComponent],
  imports: [
    CommonModule,
    AdminTeamsPageRoutingModule
  ]
})
export class AdminTeamsPageModule { }
