import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavComponent} from './nav/nav.component';
import {MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
import {LogoComponent} from './nav/logo/logo.component';
import {RouterModule} from '@angular/router';
import {LogoutComponent} from './nav/logout/logout.component';
import {MenuComponent} from './nav/menu/menu.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';

@NgModule({
  declarations: [
    NavComponent,
    LogoComponent,
    LogoutComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatTooltipModule,
    RouterModule,
    PerfectScrollbarModule
  ],
  exports: [
    NavComponent
  ]
})
export class NavModule {
}
