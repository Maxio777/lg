import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainPageComponent} from './main-page/main-page.component';

const routes: Routes = [
  {
    path: '', component: MainPageComponent,
    data: {title: 'ГЛАВНАЯ'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPageRoutingModule {
}
