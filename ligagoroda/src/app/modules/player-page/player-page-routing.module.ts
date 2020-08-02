import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PlayerComponent} from './player/player.component';

const routes: Routes = [
  {path: '', component: PlayerComponent, data: {title: 'ИГРОКИ'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerPageRoutingModule {
}
