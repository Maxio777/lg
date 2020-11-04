import {Component, ChangeDetectionStrategy} from '@angular/core';
import {TitleService} from '@core/title-service/title.service';

@Component({
  selector: 'lg-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidePanelComponent {
  constructor(public titleService: TitleService) {
  }

}
