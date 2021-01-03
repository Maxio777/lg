import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {ClientComponent} from './layouts/client/client/client.component';
import {AdminComponent} from './layouts/admin/admin/admin.component';
import {AuthGuardService} from '@core/services/guards/auth-guard.service';

const routes: Routes = [
  {
    path: '', component: ClientComponent, children: [
      {
        path: '',
        loadChildren: () => import('./pages/main-page/main-page.module').then(m => m.MainPageModule)
      },
      {
        path: 'games',
        loadChildren: () => import('./pages/games-page/games-page.module').then(m => m.GamesPageModule)
      },
      {
        path: 'games/:id',
        loadChildren: () => import('./pages/game-page/game-page.module').then(m => m.GamePageModule)
      },
      {
        path: 'table',
        loadChildren: () => import('./pages/table-page/table-page.module').then(m => m.TablePageModule)
      },
      {
        path: 'teams/:id',
        loadChildren: () => import('./pages/team-page/team-page.module').then(m => m.TeamPageModule)
      },
      {
        path: 'players',
        loadChildren: () => import('./pages/players-page/players-page.module').then(m => m.PlayersPageModule)
      },
      {
        path: 'players/:id',
        loadChildren: () => import('./pages/player-page/player-page.module').then(m => m.PlayerPageModule)
      },
      {
        path: 'news/page/:p',
        loadChildren: () => import('./pages/news-page/news-page.module').then(m => m.NewsPageModule)
      },
      {
        path: 'news/:id',
        loadChildren: () => import('./pages/one-news-page/one-news-page.module').then(m => m.OneNewsPageModule)
      },
      {
        path: 'contacts',
        loadChildren: () => import('./pages/contacts-page/contacts-page.module').then(m => m.ContactsPageModule)
      }
    ]
  },
  {
    path: 'admin', component: AdminComponent, canActivate: [AuthGuardService], children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/admin-dashboard-page/admin-dashboard-page.module').then(m => m.AdminDashboardPageModule)
      },
      {
        path: 'games',
        loadChildren: () => import('./pages/admin-games-page/admin-games-page.module').then(m => m.AdminGamesPageModule)
      },
      {
        path: 'players',
        loadChildren: () => import('./pages/admin-players-page/admin-players-page.module').then(m => m.AdminPlayersPageModule)
      },
      {
        path: 'teams',
        loadChildren: () => import('./pages/admin-teams-page/admin-teams-page.module').then(m => m.AdminTeamsPageModule)
      },
      {
        path: 'tournaments',
        loadChildren: () => import('./pages/admin-tournaments-page/admin-tournaments-page.module').then(m => m.AdminTournamentsPageModule)
      },
      {
        path: 'news',
        loadChildren: () => import('./pages/admin-news-page/admin-news-page.module').then(m => m.AdminNewsPageModule)
      },
    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth-page/auth-page.module').then(m => m.AuthPageModule)
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
