
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService, AlertService } from '../_services/index';
import { Observable } from 'rxjs';
import { resolve } from 'q';

@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor(
        private router: Router,
        private loginService: LoginService,
        private alertService: AlertService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        
        if (this.loginService.isLoggedIn) {
            return true;
        } else {
            this.router.navigate(['/login'], { queryParams: { error: "There is no active login session, please login again" } } );
            return false;
        }
       
    }
    
}