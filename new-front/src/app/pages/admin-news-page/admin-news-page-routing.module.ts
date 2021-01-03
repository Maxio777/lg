import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminNewsPageComponent} from './admin-news-page/admin-news-page.component';


const routes: Routes = [
  {
    path: '', component: AdminNewsPageComponent,
    data: {title: 'НОВОСТИ'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminNewsPageRoutingModule {
}
