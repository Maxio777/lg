import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TitleService} from '../../../../services/title/title.service';

@Component({
  selector: 'app-right-area',
  templateUrl: './right-area.component.html',
  styleUrls: ['./right-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RightAreaComponent {
  constructor(public dataService: TitleService) {}
}

