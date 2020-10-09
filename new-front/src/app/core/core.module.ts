import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainRestService} from '../rest/main-rest-service/main-rest.service';
import {ClientDataService} from './client-data-service/client-data.service';
import {DataRestService} from '../rest/data-rest-service/data-rest.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    MainRestService,
    ClientDataService,
    DataRestService
  ]
})
export class CoreModule {
}
