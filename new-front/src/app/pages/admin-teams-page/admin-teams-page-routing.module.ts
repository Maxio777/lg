import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminTeamsPageComponent} from './admin-teams-page/admin-teams-page.component';

const routes: Routes = [
  {
    path: '', component: AdminTeamsPageComponent,
    data: {title: 'КОМАНДЫ'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminTeamsPageRoutingModule { }
