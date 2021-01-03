import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminNewsPageRoutingModule } from './admin-news-page-routing.module';
import { AdminNewsPageComponent } from './admin-news-page/admin-news-page.component';


@NgModule({
  declarations: [AdminNewsPageComponent],
  imports: [
    CommonModule,
    AdminNewsPageRoutingModule
  ]
})
export class AdminNewsPageModule { }
