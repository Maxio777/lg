import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainRestService} from './rest/main-rest-service/main-rest.service';
import {ClientDataService} from './services/client-data-service/client-data.service';
import {DataRestService} from './rest/data-rest-service/data-rest.service';
import {ClientComponent} from '../layouts/client/client/client.component';
import {HeaderComponent} from '../layouts/client/components/header/header.component';
import {FooterComponent} from '../layouts/components/footer/footer.component';
import {LogoComponent} from '../layouts/client/components/header/logo/logo.component';
import {MenuComponent} from '../layouts/client/components/header/menu/menu.component';
import {MaterialModule} from '../shared/material/material.module';
import {AdminComponent} from '../layouts/admin/admin/admin.component';
import {AdminHeaderComponent} from '../layouts/admin/components/admin-header/admin-header.component';
import {UiModule} from '../shared/ui/ui.module';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    ClientComponent,
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    MenuComponent,
    AdminComponent,
    AdminHeaderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    UiModule,
    RouterModule
  ],
  providers: [
    MainRestService,
    ClientDataService,
    DataRestService
  ],
  exports: [
  ]
})
export class CoreModule {
}
