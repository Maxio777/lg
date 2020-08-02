import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NewsSinglePageRoutingModule} from './news-single-page-routing.module';
import {NewsSingleComponent} from './news-single/news-single.component';
import {UiModule} from '../ui/ui.module';

@NgModule({
  declarations: [NewsSingleComponent],
  imports: [
    CommonModule,
    NewsSinglePageRoutingModule,
    UiModule
  ]
})
export class NewsSinglePageModule {
}
