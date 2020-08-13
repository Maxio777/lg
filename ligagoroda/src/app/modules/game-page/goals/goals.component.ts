import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {GameLG} from '../../../models/game';
import {EventLG} from '../../../models/events';
import {GamePageService} from '../game-page.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GamePageService]
})
export class GoalsComponent {
  @Input() game: GameLG | undefined;

  constructor(public gamePageService: GamePageService) { }

  goals(): EventLG[] {
    return this.game
      ? this.game.events.filter(e => ['goal', '6mGoal', '10mGoal', 'penaltyGoal', 'autoGoal'].includes(e.type))
      : [];
  }

}
