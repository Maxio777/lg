import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './main-page/main-page.component';
import { NewsMainPageComponent } from './components/news-main-page/news-main-page.component';
import { GamesMainPageComponent } from './components/games-main-page/games-main-page.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [MainPageComponent, NewsMainPageComponent, GamesMainPageComponent],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    SharedModule
  ]
})
export class MainPageModule { }
