import {Injectable} from '@angular/core';
import {MainRestService} from '../main-rest-service';
import {Observable} from 'rxjs';
import {ManagerLG} from '../../models/manager';


@Injectable({
  providedIn: 'root'
})
export class RestManagerService {
  apiLG: string = 'admin/manager/';

  constructor(private mainRestService: MainRestService) {
  }

  getManagerLG(): Observable<any> {
    return this.mainRestService.getLG(this.apiLG);
  }

  updateManagerLG(body: ManagerLG) {
    return this.mainRestService.putLG(body, this.apiLG);
  }

  postManagerLG(body: ManagerLG) {
    return this.mainRestService.postLG(body, this.apiLG);
  }


  deleteManagerLG(idManager: any) {
    return this.mainRestService.deleteLG(idManager, this.apiLG + idManager);
  }


}
