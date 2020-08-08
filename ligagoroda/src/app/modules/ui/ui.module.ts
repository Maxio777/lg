import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArrowComponent} from './arrow/arrow.component';
import {SearchInputComponent} from './search-input/search-input.component';
import {SharedModule} from '../shared.module';
import {PageHeaderComponent} from './page-header/page-header.component';
import {GoBackComponent} from './go-back/go-back.component';
import {PlayerTableComponent} from './player-table/player-table.component';
import {RouterModule} from '@angular/router';
import {GamesTableComponent} from './games-table/games-table.component';

const components = [
  ArrowComponent,
  SearchInputComponent,
  PageHeaderComponent,
  GoBackComponent,
  PlayerTableComponent,
  GamesTableComponent
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ],
  exports: components
})
export class UiModule {
}
