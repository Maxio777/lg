import { Injectable } from '@angular/core';
import { MainRestService } from '../main-rest-service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
// /upload/:kind/:_id
  apiLG: string = 'admin/upload';
  options = { headers: { 'Content-Type': 'multipart/form-data' }};

  constructor(private mainRestService: MainRestService) { }

  putImage(body: FormData, kind: string, _id: string): Observable<any> {
    return this.mainRestService.putLG(body, `${this.apiLG}/${kind}/${_id}`, this.options);
  }
}
