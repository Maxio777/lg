import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminGamePageComponent} from './admin-game-page/admin-game-page.component';

const routes: Routes = [{
  path: '', component: AdminGamePageComponent,
  data: {title: 'ИГРЫ'}
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminGamePageRoutingModule {
}
