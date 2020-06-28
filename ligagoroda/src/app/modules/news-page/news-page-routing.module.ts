import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NewsComponent} from './news/news.component';

const routes: Routes = [
  {path: '', component: NewsComponent, data: {title: 'НОВОСТИ'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsPageRoutingModule {
}
