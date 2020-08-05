import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TeamComponent} from './team/team.component';

const routes: Routes = [
  { path: '', component: TeamComponent, data: {title: 'КОМАНДЫ'}}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamPageRoutingModule { }
