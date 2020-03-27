import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TournamentTableComponent } from './tournament-table/tournament-table.component';
import { StatPlayersComponent } from './stat-players/stat-players.component';
import { GamesComponent } from './games/games.component';
import { GameComponent } from './game/game.component';
import { PlayerComponent } from './player/player.component';
import { TeamComponent } from './team/team.component';
import { NewsComponent } from './all-news/news/news.component';
import { SingleNewsComponent } from './all-news/single-news/single-news.component';
import { URLS_CLIENT } from '../../routing-configs/config-routing-client';
import { MainPageComponent } from './main-page/main-page.component';
import { IndexComponent } from './main-page/index/index.component';


const routes: Routes = [
  {path: '', component: MainPageComponent, data: { title: 'ГЛАВНАЯ' },
    children: [
      {path: '', component: IndexComponent },
      {path: URLS_CLIENT.stat.route, component: TournamentTableComponent, data: { title: URLS_CLIENT.stat.title  }},
      {path: URLS_CLIENT.statPlayers.route, component: StatPlayersComponent, data: { title: URLS_CLIENT.statPlayers.title  }},
      {path: URLS_CLIENT.games.route, component: GamesComponent, data: { title: URLS_CLIENT.games.title }},
      {path: 'games/:id', component: GameComponent, data: { title: 'ИГРА' }},
      {path: 'player/:id', component: PlayerComponent, data: { title: 'СТРАНИЦА ИГРОКА' }},
      {path: 'teams/:id', component: TeamComponent, data: { title: 'КОМАНДА' }},
      {path: 'news/page/:p', component: NewsComponent, data: { title: 'НОВОСТИ' }},
      {path: 'news/:id', component: SingleNewsComponent, data: { title: 'НОВОСТЬ' }}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
