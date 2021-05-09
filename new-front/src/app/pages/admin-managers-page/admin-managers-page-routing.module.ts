import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminManagersPageComponent} from 'src/app/pages/admin-managers-page/admin-managers-page/admin-managers-page.component';


const routes: Routes = [
  {
    path: '', component: AdminManagersPageComponent,
    data: {title: 'ИГРЫ'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminManagersPageRoutingModule {
}
