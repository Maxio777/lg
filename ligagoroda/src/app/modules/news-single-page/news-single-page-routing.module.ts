import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NewsSingleComponent} from './news-single/news-single.component';

const routes: Routes = [
  {path: '', component: NewsSingleComponent, data: {title: 'НОВОСТИ'}}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsSinglePageRoutingModule {
}
