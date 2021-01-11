import { Injectable } from '@angular/core';
import {MainRestService} from '@core/rest/main-rest-service/main-rest.service';
import {Observable} from 'rxjs';
import {News} from '@models/news';

@Injectable({
  providedIn: 'root'
})
export class NewsRestService {
  apiLG = 'admin/news/';

  constructor(private mainService: MainRestService) {}

  getNewsLG<T>(id: string = ''): Observable<T> {
    return this.mainService.getLG(this.apiLG + id);
  }

  updateNewsLG(body: string): Observable<any> {
    return this.mainService.putLG(body, this.apiLG);
  }

  postNewsLG(body: string): Observable<any> {
    return this.mainService.postLG(JSON.stringify(body), this.apiLG);
  }

  deleteNewsLG(newsId: any): Observable<any> {
    return this.mainService.deleteLG(this.apiLG + newsId );
  }


  ////////////////////////////////////////

  postNewsLG2(data: News, image: File | null, kind: string): Observable<any> {
    const fd = new FormData();

    if (image) {
      fd.append('image', image, image.name);
    }
    fd.append('title', data.title);
    fd.append('textPreview', data.textPreview);
    fd.append('text', data.text);
    return this.mainService.postLG2(fd, this.apiLG + '?kind=' + kind);
  }

  updateNewsLG2(data: News, image: File | null, kind: string, id: string): Observable<any> {
    const fd = new FormData();

    if (image) {
      fd.append('image', image, image.name);
    }
    fd.append('title', data.title);
    fd.append('textPreview', data.textPreview);
    fd.append('text', data.text);
    fd.append('tags', JSON.stringify(data.tags));
    return this.mainService.putLG2(fd, this.apiLG + id + '?kind=' + kind);
  }

}
