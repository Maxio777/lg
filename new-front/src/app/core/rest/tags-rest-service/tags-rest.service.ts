import {Injectable} from '@angular/core';
import {MainRestService} from '@core/rest/main-rest-service/main-rest.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Tag} from '@models/tag';

@Injectable({
  providedIn: 'root'
})
export class TagsRestService {

  apiLG = 'admin/tag/';

  constructor(private mainService: MainRestService) {
  }

  getTagsLG(): Observable<Tag[]> {
    return this.mainService.getLG(this.apiLG).pipe(
      map((tags: Tag[]) => Tag.fromJsArr(tags)));
  }

  updateTagLG(body: string): Observable<any> {
    return this.mainService.putLG(body, this.apiLG);
  }

  postTagLG(body: string): Observable<any> {
    return this.mainService.postLG(body, this.apiLG);
  }


  deleteTagLG(id: string): Observable<any> {
    return this.mainService.deleteLG(this.apiLG + id);
  }
}
