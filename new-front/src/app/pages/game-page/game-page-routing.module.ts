import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GamePageComponent} from './game-page/game-page.component';

const routes: Routes = [
  {
    path: '', component: GamePageComponent,
    data: {title: 'ИГРЫ'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamePageRoutingModule {
}
