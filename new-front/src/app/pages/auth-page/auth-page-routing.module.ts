import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthPageComponent} from './auth-page/auth-page.component';

const routes: Routes = [
  {
    path: '', component: AuthPageComponent,
    data: {title: 'АВТОРИЗАЦИЯ'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthPageRoutingModule { }
