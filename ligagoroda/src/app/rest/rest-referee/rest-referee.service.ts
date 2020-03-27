import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MainRestService } from '../main-rest-service';

@Injectable({
  providedIn: 'root'
})
export class RestRefereeService {
  apiLG: string = 'admin/referee/';

  constructor(private mainService: MainRestService) { }

  getRefereeLG(): Observable<any> {
    return this.mainService.getLG(this.apiLG);
  }

  updateRefereeLG(body: string) {
    return this.mainService.putLG(body, this.apiLG);
  }

  postRefereeLG(body: string) {
    return this.mainService.postLG(body, this.apiLG);
  }


  deleteRefereeLG(body: any) {
    return this.mainService.deleteLG(body, this.apiLG);
  }


}

