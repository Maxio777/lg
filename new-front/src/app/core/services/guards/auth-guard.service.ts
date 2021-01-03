import {CanActivate, Router, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthService} from '@core/services/auth-service/auth.service';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {
  }

  canActivate():
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isAuth$.pipe(map(isLoginStatus => {
        if (!isLoginStatus) {
          this.toastr.info('Необходимо авторизоваться', 'Доступ закрыт!');
          this.router.navigate(['/auth']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
