import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminManagersPageRoutingModule} from './admin-managers-page-routing.module';
import {AdminManagersPageComponent} from './admin-managers-page/admin-managers-page.component';
import {SharedModule} from 'src/app/shared/shared.module';


@NgModule({
  declarations: [AdminManagersPageComponent],
  imports: [
    CommonModule,
    AdminManagersPageRoutingModule,
    SharedModule
  ]
})
export class AdminManagersPageModule {
}
