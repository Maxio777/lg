import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared.module';
import { RegisterComponent } from './register/register.component';
import {CoreModule} from '../core.module';

@NgModule({
  declarations: [AuthComponent, RegisterComponent],
  imports: [
    CoreModule,
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
