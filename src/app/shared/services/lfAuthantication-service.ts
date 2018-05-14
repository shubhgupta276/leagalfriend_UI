import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../../auth-shell/auth-shell.service';
import { Observable } from 'rxjs';

@Injectable()
export class LFAuthantication implements CanActivate {
    constructor(private _authService: AuthService, private router: Router) {
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (this._authService.isLoggedIn())
        {
            return true;
        }
        else {
            this.router.navigate(["/login"]);
            return false;
        }
    }
}