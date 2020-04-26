import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone();

    return next.handle(authReq).pipe(
      tap(
        () => {},
        err => {
          if (err instanceof HttpErrorResponse) {
            this.toastr.error(err.error.message);
          }
        }
      )
    );
  }
}
