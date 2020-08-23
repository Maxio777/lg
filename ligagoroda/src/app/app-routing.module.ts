import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
// import {AuthGuardService, ChugunGuardService} from './services/guards/auth-guard.service';
import {NotFoundComponent} from './assets/components/not-found/not-found.component';

const routes: Routes = [
  {path: 'admin', loadChildren: './modules/admin/admin.module#AdminModule'},
  {path: 'auth', loadChildren: './modules/auth/auth.module#AuthModule'},
  {path: '', loadChildren: './modules/client/client.module#ClientModule'},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
