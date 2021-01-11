import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminNewsSingleComponent} from './admin-news-single/admin-news-single.component';

const routes: Routes = [
  {
    path: '', component: AdminNewsSingleComponent,
    data: {title: 'НОВОСТИ'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminNewsSinglePageRoutingModule {
}
