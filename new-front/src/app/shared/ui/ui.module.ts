import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageHeaderComponent} from './page-header/page-header.component';
import {SearchInputComponent} from './search-input/search-input.component';
import {MaterialModule} from '../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PlayerTableComponent} from './player-table/player-table.component';
import {RouterModule} from '@angular/router';
import {GamesTableComponent} from './games-table/games-table.component';
import {ArrowComponent} from './arrow/arrow.component';
import {GoBackComponent} from './go-back/go-back.component';
import {SidePanelComponent} from './side-panel/side-panel.component';
import {SideTableComponent} from './side-panel/side-table/side-table.component';
import {SideGamesComponent} from './side-panel/side-games/side-games.component';
import {SidePlayersComponent} from './side-panel/side-players/side-players.component';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {SideSkeletonComponent} from './side-panel/side-skeleton/side-skeleton.component';
import {SideImageSkeletonComponent} from './side-panel/side-image-skeleton/side-image-skeleton.component';
import {SideNewsComponent} from './side-panel/side-news/side-news.component';
import {MatRippleModule} from '@angular/material/core';
import {AdminFileUploadComponent} from './admin-file-upload/admin-file-upload.component';
import {GoalsComponent} from 'src/app/pages/game-page/components/goals/goals.component';
import {LineupsComponent} from 'src/app/pages/game-page/components/lineups/lineups.component';
import {MatchInfoComponent} from 'src/app/pages/game-page/components/match-info/match-info.component';
import {EventsComponent} from 'src/app/pages/game-page/components/events/events.component';
import {TeamNameComponent} from 'src/app/pages/game-page/components/team-name/team-name.component';
import {MatchScoreComponent} from 'src/app/pages/game-page/components/match-info/match-score/match-score.component';
import {RefereesComponent} from 'src/app/pages/game-page/components/referees/referees.component';
import {TourDateCompletedComponent} from 'src/app/pages/game-page/components/match-info/tour-date-completed/tour-date-completed.component';
import {ManagersComponent} from 'src/app/pages/game-page/components/managers/managers.component';


const components = [
  PageHeaderComponent,
  SearchInputComponent,
  PlayerTableComponent,
  GamesTableComponent,
  ArrowComponent,
  GoBackComponent,
  SidePanelComponent,
  SideTableComponent,
  SideGamesComponent,
  SidePlayersComponent,
  SideSkeletonComponent,
  SideImageSkeletonComponent,
  SideNewsComponent,
  AdminFileUploadComponent,
  GoalsComponent,
  LineupsComponent,
  MatchInfoComponent,
  EventsComponent,
  TeamNameComponent,
  MatchScoreComponent,
  RefereesComponent,
  TourDateCompletedComponent,
  ManagersComponent
];


@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgxSkeletonLoaderModule,
    MatRippleModule
  ],
  exports: [...components]
})
export class UiModule {
}
