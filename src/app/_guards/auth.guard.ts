
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JsdoService, AlertService } from '../_services/index';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private loginService: JsdoService,
        private alertService: AlertService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let isAuthorized = this.loginService.session;
        return new Promise<void>((resolve, reject) => {
            resolve(isAuthorized.isAuthorized());
        }).then((val) => {
            return true;
        })
        .catch((val) => {
            //console.log(val);
            this.router.navigate(['/login'], );
            return false;
        });
    }
    
}