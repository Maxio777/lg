import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TablePageComponent } from './table-page/table-page.component';
import {URLS_CLIENT} from '../../assets/routing-configs/config-routing-client';

const routes: Routes = [
  { path: '', component: TablePageComponent, data: {title: URLS_CLIENT.table.title}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablePageRoutingModule { }
