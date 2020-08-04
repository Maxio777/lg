import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArrowComponent} from './arrow/arrow.component';
import {SearchInputComponent} from './search-input/search-input.component';
import {SharedModule} from '../shared.module';
import {PageHeaderComponent} from './page-header/page-header.component';
import {GoBackComponent} from './go-back/go-back.component';

const components = [
  ArrowComponent,
  SearchInputComponent,
  PageHeaderComponent,
  GoBackComponent
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: components
})
export class UiModule {
}
