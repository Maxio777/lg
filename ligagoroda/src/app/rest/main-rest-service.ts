import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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
    return this.http.delete(this.host + url + id);
  }


  // Для запросов с фотками без опшнс

  putLG2<T>(data: T, url: string): any {
    return this.http.put(this.host + url, data );
  }

  postLG2<T>(data: T, url: string) {
    return this.http.post(this.host + url, data );
  }


}
