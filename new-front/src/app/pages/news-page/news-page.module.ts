import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NewsPageRoutingModule} from './news-page-routing.module';
import {NewsPageComponent} from './news-page/news-page.component';
import {SharedModule} from '../../shared/shared.module';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [NewsPageComponent],
  imports: [
    CommonModule,
    NewsPageRoutingModule,
    SharedModule,
    NgxPaginationModule,
  ]
})
export class NewsPageModule {
}
