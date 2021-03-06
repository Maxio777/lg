import {APP_INITIALIZER, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ClientRoutingModule} from './client-routing.module';
import {IndexComponent} from './main-page/index/index.component';
import {PlayersComponent} from './main-page/right-area/players/players.component';
import {TableComponent} from './main-page/right-area/table/table.component';
import {SharedModule} from '../shared.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {LeftAreaComponent} from './main-page/left-area/left-area.component';
import {MainPageComponent} from './main-page/main-page.component';
import {RightAreaComponent} from './main-page/right-area/right-area.component';
import {ChangeTournamentComponent} from './main-page/right-area/change-tournament/change-tournament.component';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {NewsMainPageComponent} from './news-main-page/news-main-page.component';
import {GamesComponent} from './main-page/right-area/games/games.component';
import {GamesPageComponent} from './games-page/games-page.component';
import {UiModule} from '../ui/ui.module';
import {ClientDataService, init} from './services/client-data/client-data.service';

@NgModule({
  declarations: [
    GamesPageComponent,
    TableComponent,
    PlayersComponent,
    IndexComponent,
    LeftAreaComponent,
    MainPageComponent,
    RightAreaComponent,
    ChangeTournamentComponent,
    NewsMainPageComponent,
    GamesComponent
  ],
  exports: [
    RightAreaComponent
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: init,
      deps: [ClientDataService],
      multi: true
    },
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule,
    NgxPaginationModule,
    PerfectScrollbarModule,
    UiModule
  ]
})
export class ClientModule {
}
