import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PlayersComponent} from './players/players.component';

const routes: Routes = [
  {path: '', component: PlayersComponent, data: {title: 'ИГРОКИ'}}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayersPageRoutingModule {
}
