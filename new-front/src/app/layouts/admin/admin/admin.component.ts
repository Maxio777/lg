import { Component, ChangeDetectionStrategy } from '@angular/core';
import {LINKS_ADMIN} from '@assets/constants/links-menu-admin';

@Component({
  selector: 'lg-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent {
  isSmallWidth = false;
  links = LINKS_ADMIN;

  toggleWidth(): void {
    // this.isSmallWidth = !this.isSmallWidth;
  }

}
