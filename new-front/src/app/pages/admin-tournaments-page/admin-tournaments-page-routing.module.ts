import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminTournamentsPageComponent} from './admin-tournaments-page/admin-tournaments-page.component';

const routes: Routes = [
  {
    path: '', component: AdminTournamentsPageComponent,
    data: {title: 'ТУРНИРЫ'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminTournamentsPageRoutingModule {
}
