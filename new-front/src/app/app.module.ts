import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from '@core/core.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ClientDataService, init} from '@core/services/client-data-service/client-data.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {initTitleService, TitleService} from '@core/services/title-service/title.service';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {AppHttpInterceptor} from '@core/services/http-interceptor';
import {ToastrModule} from 'ngx-toastr';
import {initSettings, SettingsService} from '@core/services/settings/settings.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    ToastrModule.forRoot({
      timeOut: 6000,
      positionClass: 'toast-bottom-right',
    })
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
      useFactory: initSettings,
      deps: [SettingsService],
      multi: true
    },
    {provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true},
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
