import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthComponent} from './auth/auth.component';
import {AuthRoutingModule} from './auth-routing.module';
import {SharedModule} from '../shared.module';
import {RegisterComponent} from './register/register.component';
import {InputTrimDirective} from '../../assets/directives/input-trim.directive';

@NgModule({
  declarations: [AuthComponent, RegisterComponent, InputTrimDirective],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
  ]
})
export class AuthModule {
}
