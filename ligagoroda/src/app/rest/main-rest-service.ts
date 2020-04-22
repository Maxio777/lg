import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// const API_DEV_LG = 'http://ligagoroda.ru/api/v1/';
// const API_DEV_LG = 'http://localhost:5000/api/v1/';
const OPTIONS = { headers: { 'Content-Type': 'application/json' }};


@Injectable()
export class MainRestService {
  public host: string = '';

  constructor(private http: HttpClient) {
    this.host = environment.host;
  }

  getLG(url: string): Observable<any> {
    return this.http.get(this.host + url);
  }

  postLG<T>(data: T, url: string) {
    return this.http.post(this.host + url, data, OPTIONS );
  }

  putLG<T>(data: T, url: string, options = OPTIONS): any {
    return this.http.put(this.host + url, data, options );
  }

  deleteLG(id: any, url: string) {
    return this.http.delete(this.host + url, {...OPTIONS, params: id} );     // TODO - убрать парам id
  }

}
