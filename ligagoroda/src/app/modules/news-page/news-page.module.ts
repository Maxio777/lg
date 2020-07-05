import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NewsPageRoutingModule} from './news-page-routing.module';
import {NewsComponent} from './news/news.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';

@NgModule({
  declarations: [NewsComponent],
  imports: [
    CommonModule,
    NewsPageRoutingModule,
    NgxPaginationModule,
    FormsModule,
    MatIconModule,
    NgxSkeletonLoaderModule,
  ]
})
export class NewsPageModule {
}
