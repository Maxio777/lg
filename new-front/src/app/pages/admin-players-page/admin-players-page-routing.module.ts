import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminPlayersPageComponent} from './admin-players-page/admin-players-page.component';

const routes: Routes = [
  {
    path: '', component: AdminPlayersPageComponent,
    data: {title: 'ИГРОКИ'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPlayersPageRoutingModule {
}
