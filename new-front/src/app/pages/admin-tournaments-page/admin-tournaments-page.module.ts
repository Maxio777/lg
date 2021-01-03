import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminTournamentsPageRoutingModule} from './admin-tournaments-page-routing.module';
import {AdminTournamentsPageComponent} from './admin-tournaments-page/admin-tournaments-page.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [AdminTournamentsPageComponent],
  imports: [
    CommonModule,
    AdminTournamentsPageRoutingModule,
    SharedModule
  ]
})
export class AdminTournamentsPageModule {
}
