import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainRestService} from '../rest/main-rest-service/main-rest.service';
import {ClientDataService} from './client-data-service/client-data.service';
import {DataRestService} from '../rest/data-rest-service/data-rest.service';
import {ClientModule} from '../layouts/client/client.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ClientModule
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
