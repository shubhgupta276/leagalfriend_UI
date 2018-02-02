import { Injectable, Injector } from '@angular/core';
import 'rxjs/add/operator/do';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpResponse,
    HttpEvent,
    HttpErrorResponse,
    
    
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TokenService } from '../services/token-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: TokenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.indexOf('login') >= 0 || (req.url.indexOf('password-reset') >= 0) || (req.url.indexOf('signup') >= 0) ){
        console.log('inside auth interceptor login');
        return next.handle(req);
    }else{
        console.log('inside auth interceptor login');
        const authHeader = this.auth.getAuthorizationHeader();
        const authReq = req.clone({
            headers: req.headers
                .set('access_token', authHeader.access_token)
                .set('customer-id', authHeader.client_id.toString())
                .set('content-type', 'application/json')
        });
        return next.handle(authReq);
    }
  }
}