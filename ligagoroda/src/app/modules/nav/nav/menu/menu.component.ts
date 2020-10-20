import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LINKS_TOP} from '../../../../assets/constants/links-menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  linksTop = LINKS_TOP;
}
