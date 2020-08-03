import {NgModule} from '@angular/core';
import {PlayersPageRoutingModule} from './players-page-routing.module';
import {PlayersComponent} from './players/players.component';
import {UiModule} from '../ui/ui.module';
import {SharedModule} from '../shared.module';

@NgModule({
  declarations: [PlayersComponent],
  imports: [
    PlayersPageRoutingModule,
    SharedModule,
    UiModule
  ]
})
export class PlayersPageModule {
}
