import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { IndexComponent } from './main-page/index/index.component';
import { StatPlayersComponent } from './stat-players/stat-players.component';
import { PlayerComponent } from './player/player.component';
import { GameComponent } from './game/game.component';
import { TeamComponent } from './team/team.component';
import { SingleNewsComponent } from './all-news/single-news/single-news.component';
import { NewsComponent } from './all-news/news/news.component';
import { TournamentTableComponent } from './tournament-table/tournament-table.component';
import { GamesComponent } from './games/games.component';
import { SharedModule } from '../shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NewsListComponent } from './all-news/news-list/news-list.component';
import { LeftAreaComponent } from './main-page/left-area/left-area.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { StatComponent } from './stat/stat.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RightAreaComponent } from './main-page/right-area/right-area.component';
import { ChangeTournamentComponent } from './main-page/right-area/change-tournament/change-tournament.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

@NgModule({
  declarations: [
    GamesComponent,
    TournamentTableComponent,
    NewsComponent,
    SingleNewsComponent,
    TeamComponent,
    GameComponent,
    PlayerComponent,
    StatPlayersComponent,
    IndexComponent,
    NewsListComponent,
    LeftAreaComponent,
    DashboardComponent,
    StatComponent,
    MainPageComponent,
    RightAreaComponent,
    ChangeTournamentComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule,
    NgxPaginationModule,
    PerfectScrollbarModule
  ]
})
export class ClientModule { }
