import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NewsPageComponent} from './news-page/news-page.component';

const routes: Routes = [
  {
    path: '', component: NewsPageComponent,
    data: {title: 'НОВОСТИ'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsPageRoutingModule {
}
