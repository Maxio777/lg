import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminTeamPageComponent} from './admin-team-page/admin-team-page.component';

const routes: Routes = [
  {
    path: '', component: AdminTeamPageComponent,
    data: {title: 'КОМАНДЫ'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminTeamPageRoutingModule {
}
