import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientModule } from './modules/client/client.module';
import {AuthGuardService, ChugunGuardService} from './services/guards/auth-guard.service';

const routes: Routes = [
  {path: 'admin', loadChildren: './modules/admin/admin.module#AdminModule', canActivate: [ChugunGuardService, AuthGuardService] },
  {path: 'auth', loadChildren: './modules/auth/auth.module#AuthModule' },
  {path: '', loadChildren: './modules/client/client.module#ClientModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
