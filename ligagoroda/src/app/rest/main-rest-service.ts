import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_DEV_LG = 'http://ligagoroda.ru/v1/';
const OPTIONS = { headers: { 'Content-Type': 'application/json' }};


@Injectable()
export class MainRestService {

    constructor(private http: HttpClient) {}

  getLG(url: string): Observable<any> {
    return this.http.get(API_DEV_LG + url);
  }

  postLG<T>(data: T, url: string) {
    return this.http.post(API_DEV_LG + url, data );
  }

  putLG<T>(data: T, url: string, options = OPTIONS): any {
    return this.http.put(API_DEV_LG + url, data, options );
  }

  deleteLG(id: any, url: string) {
    return this.http.delete(API_DEV_LG + url, {...OPTIONS, params: id} );
  }

}
