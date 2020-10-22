import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {ClientComponent} from './layouts/client/client/client.component';

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
    path: 'admin',
    loadChildren: () => import('./layouts/admin/admin.module').then(m => m.AdminModule),
    data: {preload: false}
  },
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
