import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PlayersPageComponent} from './players-page/players-page.component';

const routes: Routes = [
  {
    path: '', component: PlayersPageComponent,
    data: {title: 'ИГРОКИ'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayersPageRoutingModule {
}
