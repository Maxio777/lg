import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RestAuthService } from '../../rest/rest-auth/rest-auth.service';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuth: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!!sessionStorage.getItem('Token'));
  public fullName: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(sessionStorage.getItem('fullName'));
  public isAuth$: Observable<boolean> = this.isAuth.asObservable();

  constructor(private restAuthService: RestAuthService, private router: Router ) { }

  register(body: any) {
    return this.restAuthService.register(body).subscribe(v => console.log(v));
  }

  login(body: any) {
    return this.restAuthService.login(body).subscribe(data => {
      sessionStorage.setItem('Token', data.token);
      sessionStorage.setItem('fullName', data.fullName);
      this.isAuth.next(!!sessionStorage.getItem('Token'));
      this.fullName.next(sessionStorage.getItem('fullName'));
    });
  }

  logout() {
    sessionStorage.removeItem('Token');
    sessionStorage.removeItem('fullName');
    this.isAuth.next(false);
    this.fullName.next(null);
    this.router.navigate(['/auth']);
  }


}
