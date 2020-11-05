import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TablePageRoutingModule} from './table-page-routing.module';
import {TablePageComponent} from './table-page/table-page.component';
import {SharedModule} from '../../shared/shared.module';
import {TablePageSkeletonComponent} from './table-page/table-page-skeleton/table-page-skeleton.component';


@NgModule({
  declarations: [TablePageComponent, TablePageSkeletonComponent],
  imports: [
    CommonModule,
    TablePageRoutingModule,
    SharedModule
  ]
})
export class TablePageModule {
}
