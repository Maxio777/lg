import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthPageRoutingModule} from './auth-page-routing.module';
import {AuthPageComponent} from './auth-page/auth-page.component';
import {AuthComponent} from './components/auth/auth.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [AuthPageComponent, AuthComponent],
  imports: [
    CommonModule,
    AuthPageRoutingModule,
    SharedModule
  ]
})
export class AuthPageModule {
}
