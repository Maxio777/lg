import { Injectable } from '@angular/core';
import { MainRestService } from '../main-rest-service';
import { Observable } from 'rxjs';
import { News } from '../../models/news';

@Injectable({
  providedIn: 'root'
})
export class RestNewsService {
  apiLG: string = 'admin/news/';

  constructor(private mainService: MainRestService) {}

  getNewsLG(): Observable<News[]> {
    return this.mainService.getLG(this.apiLG);
  }

  updateNewsLG(body: string): Observable<any> {
    return this.mainService.putLG(body, this.apiLG);
  }

  postNewsLG(body: string): Observable<any> {
    return this.mainService.postLG(JSON.stringify(body), this.apiLG);
  }


  deleteNewsLG(newsId: any) {
    return this.mainService.deleteLG(newsId, this.apiLG + newsId );
  }

}
