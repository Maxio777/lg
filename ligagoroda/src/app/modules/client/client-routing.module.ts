import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PlayersComponent} from './main-page/right-area/players/players.component';
import {GameComponent} from './game/game.component';
import {URLS_CLIENT} from '../../assets/routing-configs/config-routing-client';
import {MainPageComponent} from './main-page/main-page.component';
import {IndexComponent} from './main-page/index/index.component';
import {AuthGuardService} from '../../services/guards/auth-guard.service';


const routes: Routes = [
  {
    path: '', component: MainPageComponent, data: {title: 'ГЛАВНАЯ'}, canActivate: [AuthGuardService],
    children: [
      {path: '', component: IndexComponent},
      {
        path: 'table',
        loadChildren: '../table-page/table-page.module#TablePageModule'
      },
      {
        path: 'games',
        loadChildren: '../games-page/games-page.module#GamesPageModule'
      },
      {
        path: 'players',
        loadChildren: '../players-page/players-page.module#PlayersPageModule'
      },
      {
        path: 'news/page/:p',
        loadChildren: '../news-page/news-page.module#NewsPageModule'
      },
      {
        path: 'news/:id',
        loadChildren: '../news-single-page/news-single-page.module#NewsSinglePageModule'
      },
      {
        path: 'players/:id',
        loadChildren: '../player-page/player-page.module#PlayerPageModule'
      },
      {
        path: 'teams/:id',
        loadChildren: '../team-page/team-page.module#TeamPageModule'
      },
      {
        path: URLS_CLIENT.players.route,
        component: PlayersComponent,
        data: {title: URLS_CLIENT.players.title}
      },
      {path: 'games/:id', component: GameComponent, data: {title: 'ИГРА'}},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {
}
