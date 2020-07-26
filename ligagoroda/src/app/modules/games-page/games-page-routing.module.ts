import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GamesPageComponent} from './games-page/games-page.component';

const routes: Routes = [
  {path: '', component: GamesPageComponent, data: {title: 'ИГРЫ'}}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesPageRoutingModule {
}
