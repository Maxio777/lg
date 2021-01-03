import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardPageRoutingModule } from './admin-dashboard-page-routing.module';
import { AdminDashboardPageComponent } from './admin-dashboard-page/admin-dashboard-page.component';


@NgModule({
  declarations: [AdminDashboardPageComponent],
  imports: [
    CommonModule,
    AdminDashboardPageRoutingModule
  ]
})
export class AdminDashboardPageModule { }
