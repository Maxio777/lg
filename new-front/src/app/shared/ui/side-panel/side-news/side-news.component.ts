import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ClientDataService} from '@core/client-data-service/client-data.service';

@Component({
  selector: 'lg-side-news',
  templateUrl: './side-news.component.html',
  styleUrls: ['./side-news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideNewsComponent {
  isLoad = false;

  constructor(public clientDataService: ClientDataService) {
  }
}
