import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoutComponent {

  constructor(public authService: AuthService) { }

  logout() {
    this.authService.logout();
  }
}
