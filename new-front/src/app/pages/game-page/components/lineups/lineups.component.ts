import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {Game} from '@models/game/game';

@Component({
  selector: 'lg-lineups',
  templateUrl: './lineups.component.html',
  styleUrls: ['./lineups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineupsComponent {
  @Input() game: Game | undefined;
}

