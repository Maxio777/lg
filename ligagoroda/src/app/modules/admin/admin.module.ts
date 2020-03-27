import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminPlayerComponent } from './admin-player/admin-player.component';
import { AdminTournamentComponent } from './admin-tournament/admin-tournament.component';
import { AdminGameComponent } from './admin-game/admin-game.component';
import { SharedModule } from '../shared.module';
import { CoreModule } from '../core.module';
import { AdminRefereesComponent } from './admin-referees/admin-referees.component';
import { AdminManagerComponent } from './admin-manager/admin-manager.component';
import { AdminNewsComponent } from './admin-news/admin-news.component';
import { FormComponent } from './core/form/form.component';
import { AdminTeamComponent } from './admin-team/admin-team.component';
import { DynamicFormBuilderComponent } from './core/form/dynamic-form-builder.component';
import { FieldBuilderComponent } from './core/form/field-builder.component';
import { FormsModule } from '@angular/forms';
import { TextBoxComponent } from './core/form/textbox';
import { CheckBoxComponent } from './core/form/checkbox';
import { RadioComponent } from './core/form/radio';
import { DropDownComponent } from './core/form/dropdown';
import { FileComponent } from './core/form/file';
import { AdminMainPageComponent } from './admin-main-page/admin-main-page.component';
import { AdminTeamDetailComponent } from './admin-team/admin-team-detail/admin-team-detail.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AdminGameDetailComponent } from './admin-game/admin-game-detail/admin-game-detail.component';
import { EditEventsComponent } from './admin-game/admin-game-detail/edit-events/edit-events.component';
import { AdminFileUploadComponent } from './admin-file-upload/admin-file-upload/admin-file-upload.component';
import { AdminNewsDetailComponent } from './admin-news/news-detail/admin-news-detail.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminPlayerComponent,
    AdminTournamentComponent,
    AdminGameComponent,
    AdminRefereesComponent,
    AdminManagerComponent,
    AdminNewsComponent,
    FormComponent,
    AdminTeamComponent,
    AdminGameComponent,
    DynamicFormBuilderComponent,
    FieldBuilderComponent,
    TextBoxComponent,
    CheckBoxComponent,
    DropDownComponent,
    RadioComponent,
    FileComponent,
    AdminMainPageComponent,
    AdminTeamDetailComponent,
    AdminGameDetailComponent,
    EditEventsComponent,
    AdminFileUploadComponent,
    AdminNewsDetailComponent

  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule,
        CoreModule,
        FormsModule,
        PerfectScrollbarModule
    ],
    exports: [
        AdminTeamDetailComponent
    ]
})
export class AdminModule { }
