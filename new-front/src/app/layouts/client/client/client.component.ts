import {Component, ChangeDetectionStrategy} from '@angular/core';
// @ts-ignore
import {LINKS_TOP} from '@assets/constants/links-menu';


@Component({
  selector: 'lg-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientComponent {
  links = LINKS_TOP;
}
