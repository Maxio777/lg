import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminGamesPageComponent} from './admin-games-page/admin-games-page.component';

const routes: Routes = [
  {
    path: '', component: AdminGamesPageComponent,
    data: {title: 'ИГРЫ'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminGamesPageRoutingModule { }
