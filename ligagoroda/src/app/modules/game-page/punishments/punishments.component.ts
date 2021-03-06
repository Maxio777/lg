import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {GameLG} from '../../../models/game';
import {GamePageService} from '../game-page.service';
import {EventLG} from '../../../models/events';

@Component({
  selector: 'app-punishments',
  templateUrl: './punishments.component.html',
  styleUrls: ['./punishments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GamePageService]
})
export class PunishmentsComponent {
  @Input() game: GameLG | undefined;

  constructor(public gamePageService: GamePageService) { }

  punishments(): EventLG[] {
    return this.game
      ? this.game.events.filter(e => ['yellow', 'red', 'yellowRed'].includes(e.type))
      : [];
  }
}
