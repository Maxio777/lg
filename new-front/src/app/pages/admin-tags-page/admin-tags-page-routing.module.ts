import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminTagsPageComponent} from './admin-tags-page/admin-tags-page.component';

const routes: Routes = [{
  path: '', component: AdminTagsPageComponent,
  data: {title: 'ТЕГИ'}
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminTagsPageRoutingModule {
}
