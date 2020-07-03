import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PlayersComponent} from './players/players.component';
import {GamesComponent} from './games/games.component';
import {GameComponent} from './game/game.component';
import {PlayerComponent} from './player/player.component';
import {TeamComponent} from './team/team.component';
import {SingleNewsComponent} from './all-news/single-news/single-news.component';
import {URLS_CLIENT} from '../../assets/routing-configs/config-routing-client';
import {MainPageComponent} from './main-page/main-page.component';
import {IndexComponent} from './main-page/index/index.component';
import {AuthGuardService} from '../../services/guards/auth-guard.service';


const routes: Routes = [
  {
    path: '', component: MainPageComponent, data: {title: 'ГЛАВНАЯ'}, canActivate: [AuthGuardService],
    children: [
      {path: '', component: IndexComponent},
      {path: 'table', loadChildren: '../table-page/table-page.module#TablePageModule'},
      {
        path: 'news/page/:p',
        loadChildren: '../news-page/news-page.module#NewsPageModule'},
      {
        path: URLS_CLIENT.players.route,
        component: PlayersComponent,
        data: {title: URLS_CLIENT.players.title}
      },
      {path: URLS_CLIENT.games.route, component: GamesComponent, data: {title: URLS_CLIENT.games.title}},
      {path: 'games/:id', component: GameComponent, data: {title: 'ИГРА'}},
      {path: 'player/:id', component: PlayerComponent, data: {title: 'СТРАНИЦА ИГРОКА'}},
      {path: 'teams/:id', component: TeamComponent, data: {title: 'КОМАНДА'}},
      // {path: 'news/page/:p', component: NewsComponent, data: {title: 'НОВОСТИ'}},
      {path: 'news/:id', component: SingleNewsComponent, data: {title: 'НОВОСТЬ'}}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {
}
