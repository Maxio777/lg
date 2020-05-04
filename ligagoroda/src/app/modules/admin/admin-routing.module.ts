import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminGameComponent } from './admin-game/admin-game.component';
import { AdminTournamentComponent } from './admin-tournament/admin-tournament.component';
import { AdminPlayerComponent } from './admin-player/admin-player.component';
import { URLS_ADMIN } from '../../assets/routing-configs/config-routing-admin';
import { AdminRefereesComponent } from './admin-referees/admin-referees.component';
import { AdminManagerComponent } from './admin-manager/admin-manager.component';
import { AdminTeamComponent } from './admin-team/admin-team.component';
import { AdminTeamDetailComponent } from './admin-team/admin-team-detail/admin-team-detail.component';
import { AdminGameDetailComponent } from './admin-game/admin-game-detail/admin-game-detail.component';
import { AdminNewsDetailComponent } from './admin-news/news-detail/admin-news-detail.component';
import { AdminNewsComponent } from './admin-news/admin-news.component';


const routes: Routes = [
  {
    path: URLS_ADMIN.admin.route,
    component: AdminComponent,
    children: [
      {
        path: URLS_ADMIN.admin.player.route,
        component: AdminPlayerComponent,
        data: { title: URLS_ADMIN.admin.player.title }
      },
      {
        path: URLS_ADMIN.admin.referees.route,
        component: AdminRefereesComponent,
        data: { title: URLS_ADMIN.admin.referees.title }
      },
      {
        path: URLS_ADMIN.admin.manager.route,
        component: AdminManagerComponent,
        data: { title: URLS_ADMIN.admin.manager.title }
      },
      {
        path: URLS_ADMIN.admin.newsDetail.route,
        component: AdminNewsDetailComponent,
        data: { title: URLS_ADMIN.admin.newsDetail.title }
      },
      {
        path: URLS_ADMIN.admin.newsNew.route,
        component: AdminNewsDetailComponent,
        data: { title: URLS_ADMIN.admin.newsNew.title }
      },
      {
        path: URLS_ADMIN.admin.news.route,
        component: AdminNewsComponent,
        data: { title: URLS_ADMIN.admin.news.title }
      },
      {
        path: URLS_ADMIN.admin.team.route,
        component: AdminTeamComponent,
        data: { title: URLS_ADMIN.admin.team.title }
      },
      {
        path: URLS_ADMIN.admin.team.detail.route,
        component: AdminTeamDetailComponent,
        data: { title: URLS_ADMIN.admin.team.detail.title }
      },
      {
        path: URLS_ADMIN.admin.game.route,
        component: AdminGameComponent,
        data: { title: URLS_ADMIN.admin.game.title }
      },
      {
        path: URLS_ADMIN.admin.gameDetail.route,
        component: AdminGameDetailComponent,
        data: { title: URLS_ADMIN.admin.gameDetail.title }
      },
      {
        path: URLS_ADMIN.admin.gameNew.route,
        component: AdminGameDetailComponent,
        data: { title: URLS_ADMIN.admin.gameNew.title }
      },
      {
        path: URLS_ADMIN.admin.tournaments.route,
        component: AdminTournamentComponent,
        data: { title: URLS_ADMIN.admin.tournaments.title }
      },
      {
        path: URLS_ADMIN.admin.games.route,
        component: AdminGameComponent,
        data: { title: URLS_ADMIN.admin.games.title }
      },
      {
        path: '',
        redirectTo: URLS_ADMIN.admin.tournaments.route,
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
