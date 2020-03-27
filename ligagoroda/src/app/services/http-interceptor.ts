import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';


@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('Token');
    if (token) {
      const reqWithToken = req.clone({ headers: req.headers.set(
        'Authorization',
        `Bearer ${token}`
        )
      });
      return next.handle(reqWithToken);
    } else {
      return next.handle(req);
    }
  }
}
