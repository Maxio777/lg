import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RestAuthService } from '../../rest/rest-auth/rest-auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuth: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!!sessionStorage.getItem('Token'));
  public fullName: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(sessionStorage.getItem('fullName'));
  public isAuth$: Observable<boolean> = this.isAuth.asObservable();

  constructor(private restAuthService: RestAuthService, private router: Router, private toastr: ToastrService ) {
    // if (environment.host = 'http://localhost:5000/api/v1/') {
    //   this.isAuth.next(true);
    // }
  }

  register(body: any) {
    return this.restAuthService.register(body).subscribe(v => console.log(v));
  }

  login(body: any) {
    return this.restAuthService.login(body).pipe(
      tap(data => {
          sessionStorage.setItem('Token', data.token);
          sessionStorage.setItem('fullName', data.fullName);
          this.isAuth.next(!!sessionStorage.getItem('Token'));
          this.fullName.next(sessionStorage.getItem('fullName'));
          this.toastr.success(`Вы авторизованы как ${data.fullName}`);
        }
      )
    );
  }

  public logout() {
    sessionStorage.removeItem('Token');
    sessionStorage.removeItem('fullName');
    this.isAuth.next(false);
    this.fullName.next(null);
    this.router.navigate(['/auth']);
  }


}
