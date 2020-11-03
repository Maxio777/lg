import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageHeaderComponent} from './page-header/page-header.component';
import {SearchInputComponent} from './search-input/search-input.component';
import {MaterialModule} from '../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PlayerTableComponent} from './player-table/player-table.component';
import {RouterModule} from '@angular/router';
import {GamesTableComponent} from './games-table/games-table.component';
import {ArrowComponent} from './arrow/arrow.component';
import {GoBackComponent} from './go-back/go-back.component';
import {SidePanelComponent} from './side-panel/side-panel.component';
import {SideTableComponent} from './side-panel/side-table/side-table.component';
import {SideGamesComponent} from './side-panel/side-games/side-games.component';
import {SidePlayersComponent} from './side-panel/side-players/side-players.component';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {SideSkeletonComponent} from './side-panel/side-skeleton/side-skeleton.component';
import {SideImageSkeletonComponent} from './side-panel/side-image-skeleton/side-image-skeleton.component';


const components = [
  PageHeaderComponent,
  SearchInputComponent,
  PlayerTableComponent,
  GamesTableComponent,
  ArrowComponent,
  GoBackComponent,
  SidePanelComponent,
  SideTableComponent,
  SideGamesComponent,
  SidePlayersComponent,
  SideSkeletonComponent,
  SideImageSkeletonComponent
];


@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgxSkeletonLoaderModule
  ],
  exports: [...components]
})
export class UiModule {
}
