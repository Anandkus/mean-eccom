import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwtToken = localStorage.getItem("jwt");
    if (jwtToken) {
      const authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${jwtToken}`, // Add Bearer token to header
        },
      });
      return next.handle(authReq);
    }

    return next.handle(request);
  }
}
