import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageHeaderComponent} from './components/page-header/page-header.component';
import {SearchInputComponent} from './components/search-input/search-input.component';
import {MaterialModule} from '../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PlayerTableComponent} from './player-table/player-table.component';
import {RouterModule} from '@angular/router';
import {GamesTableComponent} from './games-table/games-table.component';
import {ArrowComponent} from './arrow/arrow.component';
import {GoBackComponent} from './go-back/go-back.component';


const components = [
  PageHeaderComponent, SearchInputComponent, PlayerTableComponent, GamesTableComponent, ArrowComponent, GoBackComponent
];


@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  exports: [...components]
})
export class UiModule {
}
