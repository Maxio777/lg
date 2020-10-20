import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TeamPageComponent} from './team-page/team-page.component';

const routes: Routes = [
  {
    path: '', component: TeamPageComponent,
    data: {title: 'ГЛАВНАЯ'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamPageRoutingModule {
}
