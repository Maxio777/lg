import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TablePageRoutingModule} from './table-page-routing.module';
import {TablePageComponent} from './table-page/table-page.component';
import {UiModule} from '../ui/ui.module';

@NgModule({
  declarations: [TablePageComponent],
  imports: [
    CommonModule,
    TablePageRoutingModule,
    UiModule
  ]
})
export class TablePageModule {
}
