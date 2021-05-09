import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminGamePageRoutingModule} from './admin-game-page-routing.module';
import {AdminGamePageComponent} from './admin-game-page/admin-game-page.component';
import {SharedModule} from '../../shared/shared.module';
import {ModalEditGameComponent} from './admin-game-page/components/modal-edit-game/modal-edit-game.component';
import {ModalEditComponent} from 'src/app/pages/admin-game-page/admin-game-page/components/modal-edit-lineups/modal-edit.component';
import {ModalAddPunishmentComponent} from './admin-game-page/components/modal-add-punishment/modal-add-punishment.component';
import { ModalAddGoalComponent } from './admin-game-page/components/modal-add-goal/modal-add-goal.component';
import { AdminEventsComponent } from './admin-game-page/components/admin-events/admin-events.component';
import { DeleteConfirmationComponent } from './admin-game-page/components/admin-events/delete-confirmation/delete-confirmation.component';


@NgModule({
  declarations: [
    AdminGamePageComponent,
    ModalEditGameComponent,
    ModalEditComponent,
    ModalAddPunishmentComponent,
    ModalAddGoalComponent,
    AdminEventsComponent,
    DeleteConfirmationComponent
  ],
  imports: [
    CommonModule,
    AdminGamePageRoutingModule,
    SharedModule
  ]
})
export class AdminGamePageModule {
}
