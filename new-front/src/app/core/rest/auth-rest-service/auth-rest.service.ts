import {Injectable} from '@angular/core';
import {MainRestService} from '@core/rest/main-rest-service/main-rest.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthRestService {
  apiRegisterLG = 'auth/register';
  apiLoginLG = 'auth/login';

  constructor(private mainRestService: MainRestService) {
  }

  register(body: any): Observable<any> {
    return this.mainRestService.postLG(body, this.apiRegisterLG);
  }

  login(body: any): Observable<any> {
    return this.mainRestService.postLG(body, this.apiLoginLG);
  }
}
