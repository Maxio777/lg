import { Injectable } from '@angular/core';
import { MainRestService } from '../main-rest-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestAuthService {
  apiRegisterLG: string = 'auth/register';
  apiLoginLG: string = 'auth/login';

  constructor(private mainRestService: MainRestService) { }

  register(body: any): Observable<any> {
    return this.mainRestService.postLG(body, this.apiRegisterLG);
  }

  login(body: any): Observable<any> {
    return this.mainRestService.postLG(body, this.apiLoginLG);
  }
}
