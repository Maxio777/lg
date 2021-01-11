import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminNewsSinglePageRoutingModule} from './admin-news-single-page-routing.module';
import {AdminNewsSingleComponent} from './admin-news-single/admin-news-single.component';
import {SharedModule} from '../../shared/shared.module';
import {UiModule} from '../../shared/ui/ui.module';


@NgModule({
  declarations: [AdminNewsSingleComponent],
  imports: [
    CommonModule,
    AdminNewsSinglePageRoutingModule,
    SharedModule,
    UiModule
  ]
})
export class AdminNewsSinglePageModule {
}
