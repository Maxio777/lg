import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArrowComponent} from './arrow/arrow.component';
import {SearchInputComponent} from './search-input/search-input.component';
import {SharedModule} from '../shared.module';
import {PageHeaderComponent} from './page-header/page-header.component';

@NgModule({
  declarations: [ArrowComponent, SearchInputComponent, PageHeaderComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [ArrowComponent, SearchInputComponent, PageHeaderComponent]
})
export class UiModule {
}
