import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RestAuthService } from '../../rest/rest-auth/rest-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuth: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!!sessionStorage.getItem('Token'));
  public isAuth$: Observable<boolean> = this.isAuth.asObservable();

  constructor(private restAuthService: RestAuthService) { }

  register(body: any) {
    return this.restAuthService.register(body).subscribe(v => console.log(v));
  }

  login(body: any) {
    return this.restAuthService.login(body).subscribe(data => {
      sessionStorage.setItem('Token', data.token);
      this.isAuth.next(!!sessionStorage.getItem('Token'));
    });

  }
  // getAuth(formData: FormData) {
    // return this.mainService.createToken(formData).subscribe((response: {[key: string]: any}) => {
    //   sessionStorage.setItem('Token', response.data.id);
    //   const isTokenHas = !!sessionStorage.getItem('Token');
    //   this.isAuth.next(isTokenHas);
    //   this.router.navigate([URLS_ADMIN.admin.player.url]);
    // }, error => console.log(error));
  // }


}
