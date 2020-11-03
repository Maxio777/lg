import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainPageRoutingModule} from './main-page-routing.module';
import {MainPageComponent} from './main-page/main-page.component';
import {NewsMainPageComponent} from './components/news-main-page/news-main-page.component';
import {GamesMainPageComponent} from './components/games-main-page/games-main-page.component';
import {SharedModule} from '../../shared/shared.module';
import {GamesMainPageSkeletonComponent} from './components/games-main-page/games-main-page-skeleton/games-main-page-skeleton.component';
import {NewsMainPageSkeletonComponent} from './components/news-main-page/news-main-page-skeleton/news-main-page-skeleton.component';
import {NewsMainPageSmallSkeletonComponent} from './components/news-main-page/news-main-page-small-skeleton/news-main-page-small-skeleton.component';


@NgModule({
  declarations: [
    MainPageComponent,
    NewsMainPageComponent,
    GamesMainPageComponent,
    GamesMainPageSkeletonComponent,
    NewsMainPageSkeletonComponent,
    NewsMainPageSmallSkeletonComponent
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    SharedModule
  ]
})
export class MainPageModule {
}
