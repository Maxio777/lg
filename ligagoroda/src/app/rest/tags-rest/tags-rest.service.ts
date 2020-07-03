import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {MainRestService} from '../main-rest-service';

@Injectable({
  providedIn: 'root'
})
export class TagsRestService {

  apiLG: string = 'admin/tag/';

  constructor(private mainService: MainRestService) {
  }

  getTagsLG(): Observable<any> {
    return this.mainService.getLG(this.apiLG);
  }

  updateTagLG(body: string) {
    return this.mainService.putLG(body, this.apiLG);
  }

  postTagLG(body: string) {
    return this.mainService.postLG(body, this.apiLG);
  }


  deleteTagLG(body: any) {
    return this.mainService.deleteLG(body, this.apiLG);
  }


}

