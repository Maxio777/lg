import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from '@core/core.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ClientDataService, init} from '@core/client-data-service/client-data.service';
import {HttpClientModule} from '@angular/common/http';
import {initTitleService, TitleService} from '@core/title-service/title.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: init,
      deps: [ClientDataService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initTitleService,
      deps: [TitleService],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
