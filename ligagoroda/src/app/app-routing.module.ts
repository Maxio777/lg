import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientModule } from './modules/client/client.module';

const routes: Routes = [
  {path: 'admin', loadChildren: './modules/admin/admin.module#AdminModule' },
  {path: 'auth', loadChildren: './modules/auth/auth.module#AuthModule' },
  {path: '', loadChildren: () => ClientModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
