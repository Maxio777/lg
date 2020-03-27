import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainRestService } from './rest/main-rest-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LayoutModule } from '@angular/cdk/layout';
import { DataService } from './services/data.service';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuardService } from './services/guards/auth-guard.service';
import { AppHttpInterceptor } from './services/http-interceptor';
import { MaterialModule } from './modules/material.module';
import { SharedModule } from './modules/shared.module';
import { CoreModule } from './modules/core.module';
import { NavComponent } from './modules/client/nav/nav.component';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AdminModule } from './modules/admin/admin.module';
import { ToastrModule } from 'ngx-toastr';

registerLocaleData(localeRu, 'ru');
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
  declarations: [
    AppComponent,
    NavComponent
  ],
    imports: [
      NgxsModule.forRoot([]),
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      BrowserAnimationsModule,
      LayoutModule,
      FormsModule,
      ReactiveFormsModule,
      SharedModule,
      CoreModule,
      PerfectScrollbarModule,
      AdminModule,
      ToastrModule.forRoot({
        timeOut: 3000,
        progressBar: true,
        // disableTimeOut: true,
        positionClass: 'toast-bottom-right'
      })
    ],
  exports: [MaterialModule],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    MainRestService,
    DataService,
    AuthGuardService,
    { provide: LOCALE_ID, useValue: 'ru'},
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
