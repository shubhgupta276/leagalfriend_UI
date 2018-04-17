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
    constructor(private auth: TokenService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.url.indexOf('login') >= 0 || (req.url.indexOf('password-reset') >= 0) || (req.url.indexOf('signup') >= 0)) {
            
            return next.handle(req);
        } 
        
        else if (req.url.indexOf('verifyEmail') >= 0) {
            
            const verifyEmailReq = req.clone({
                headers: req.headers.set('Content-Type', 'application/json')
            });
            return next.handle(verifyEmailReq);
        } 

         else if (req.url.indexOf('forgotpwd') >= 0) {
            
            const verifyEmailReq = req.clone({
                headers: req.headers.set('Content-Type', 'application/json')
            });
            return next.handle(verifyEmailReq);
        } 

        else if (req.url.indexOf('users/updatePassword') >= 0) {
            
            const authHeader = this.auth.getAuthorizationHeader();
            const changepwdReq = req.clone({
                headers: req.headers.set('Content-Type', 'application/json')
            });
            return next.handle(changepwdReq);
        } 
        
        else {
            const authHeader = this.auth.getAuthorizationHeader();
            const authReq = req.clone({
                headers: req.headers
                    .set('Authorization', authHeader.access_token.toString())
                    .set('customer-id', authHeader.client_id.toString())
                    .set('Content-Type', 'application/json')
                    
            });
            
            
            return next.handle(authReq);
        }
    }
}
