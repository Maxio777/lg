import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ClientRoutingModule} from './client-routing.module';
import {ClientComponent} from './client/client.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {LogoComponent} from './components/header/logo/logo.component';
import {SharedModule} from '../../shared/shared.module';
import {MenuComponent} from './components/header/menu/menu.component';
import {SidePanelComponent} from './components/side-panel/side-panel.component';
import {SideTableComponent} from './components/side-panel/side-table/side-table.component';
import {SideGamesComponent} from './components/side-panel/side-games/side-games.component';
import {SidePlayersComponent} from './components/side-panel/side-players/side-players.component';


@NgModule({
  declarations: [
    ClientComponent,
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    MenuComponent,
    SidePanelComponent,
    SideTableComponent,
    SideGamesComponent,
    SidePlayersComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule
  ]
})
export class ClientModule {
}
