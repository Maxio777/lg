import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LINKS_TOP} from '../../../../assets/constants/links-menu';
import {AuthService} from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {
  linksTop = LINKS_TOP;

  constructor(public authService: AuthService) { }

}
