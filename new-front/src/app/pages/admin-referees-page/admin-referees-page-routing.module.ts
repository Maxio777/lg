import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminRefereesPageComponent} from 'src/app/pages/admin-referees-page/admin-referees-page/admin-referees-page.component';

const routes: Routes = [
  {
    path: '', component: AdminRefereesPageComponent,
    data: {title: 'СУДЬИ'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRefereesPageRoutingModule {
}
