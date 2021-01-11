import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminTagsPageRoutingModule} from './admin-tags-page-routing.module';
import {AdminTagsPageComponent} from './admin-tags-page/admin-tags-page.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [AdminTagsPageComponent],
  imports: [
    CommonModule,
    AdminTagsPageRoutingModule,
    SharedModule
  ]
})
export class AdminTagsPageModule {
}
