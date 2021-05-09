import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRefereesPageRoutingModule} from './admin-referees-page-routing.module';
import {AdminRefereesPageComponent} from './admin-referees-page/admin-referees-page.component';
import {SharedModule} from 'src/app/shared/shared.module';


@NgModule({
  declarations: [AdminRefereesPageComponent],
  imports: [
    CommonModule,
    AdminRefereesPageRoutingModule,
    SharedModule
  ]
})
export class AdminRefereesPageModule {
}
