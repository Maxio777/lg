import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OneNewsPageRoutingModule} from './one-news-page-routing.module';
import {OneNewsPageComponent} from './one-news-page/one-news-page.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [OneNewsPageComponent],
  imports: [
    CommonModule,
    OneNewsPageRoutingModule,
    SharedModule
  ]
})
export class OneNewsPageModule {
}
