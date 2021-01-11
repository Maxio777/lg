import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminTeamsPageRoutingModule} from './admin-teams-page-routing.module';
import {AdminTeamsPageComponent} from './admin-teams-page/admin-teams-page.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [AdminTeamsPageComponent],
  imports: [
    CommonModule,
    AdminTeamsPageRoutingModule,
    SharedModule
  ]
})
export class AdminTeamsPageModule {
}
