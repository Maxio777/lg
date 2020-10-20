import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TablePageRoutingModule} from './table-page-routing.module';
import {TablePageComponent} from './table-page/table-page.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [TablePageComponent],
  imports: [
    CommonModule,
    TablePageRoutingModule,
    SharedModule
  ]
})
export class TablePageModule {
}
