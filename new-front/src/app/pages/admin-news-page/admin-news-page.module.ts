import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminNewsPageRoutingModule} from './admin-news-page-routing.module';
import {AdminNewsPageComponent} from './admin-news-page/admin-news-page.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [AdminNewsPageComponent],
  imports: [
    CommonModule,
    AdminNewsPageRoutingModule,
    SharedModule
  ]
})
export class AdminNewsPageModule {
}
