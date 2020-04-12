import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


export const InterceptorSkipHeader = 'X-Skip-Interceptor';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth = this.injector.get(AuthService);
    if (request.headers.has(InterceptorSkipHeader)) {
      const headers = request.headers.delete(InterceptorSkipHeader);
      return next.handle(request.clone({ headers }));
    } else {
      request = request.clone({
        setHeaders: {
          Authorization: `${auth.getToken()}`
        }
      });
      return next.handle(request);
    }
  }
}