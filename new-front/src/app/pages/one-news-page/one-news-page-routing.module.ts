import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {OneNewsPageComponent} from './one-news-page/one-news-page.component';

const routes: Routes = [
  {
    path: '', component: OneNewsPageComponent,
    data: {title: 'НОВОСТИ'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OneNewsPageRoutingModule {
}
