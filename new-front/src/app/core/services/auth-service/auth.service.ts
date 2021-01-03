import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthRestService} from '@core/rest/auth-rest-service/auth-rest.service';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuth: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!!sessionStorage.getItem('Token'));
  public fullName: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(sessionStorage.getItem('fullName'));
  public isAuth$: Observable<boolean> = this.isAuth.asObservable();

  constructor(private authRestService: AuthRestService, private router: Router, /*private toastr: ToastrService*/) {
  }

  register(body: any) {
    return this.authRestService.register(body).subscribe(v => console.log(v));
  }

  login(body: any): Observable<any> {
    return this.authRestService.login(body).pipe(
      tap(data => {
          sessionStorage.setItem('Token', data.token);
          sessionStorage.setItem('fullName', data.fullName);
          this.isAuth.next(!!sessionStorage.getItem('Token'));
          this.fullName.next(sessionStorage.getItem('fullName'));
          // this.toastr.success(`Вы авторизованы как ${data.fullName}`);
        }
      )
    );
  }

  public logout(): void {
    sessionStorage.removeItem('Token');
    sessionStorage.removeItem('fullName');
    this.isAuth.next(false);
    this.fullName.next(null);
    this.router.navigate(['/auth']);
  }


}
