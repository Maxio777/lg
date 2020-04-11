import { CanActivate, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate():
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isAuth$.pipe(map(isLoginStatus => {
      if (!isLoginStatus) {
        this.router.navigate(['auth']);
        return false;
      } else {
        return true;
      }
    })
    );
  }
}


@Injectable()
export class ChugunGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate():
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.fullName.pipe(map((fullName) => {
      if (fullName && fullName.trim() === 'Чугунов Вадим') {
        this.router.navigate(['/']);
        return false;
      } else {
        return true;
      }
    })
    );
  }
}
