
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService, AlertService } from '../_services/index';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor(
        private router: Router,
        private loginService: LoginService,
        private alertService: AlertService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let result; 
        let p1 = new Promise<boolean>(result);   
       
       function blaat (){
            this.loginService.session.isAuthorized()
            .then((val) => {
                console.log("then", val);
                
                if (val.result == 1) {
                    result = true;
                } else {
                    result = false;
                }
            })
                .catch((error) => {

                console.log("error", error);
                result = false;
            })
        }

        return result;
        
        
            
           // this.router.navigate(['/login'], { queryParams: { error: "There is no active login session, please login again" } } );
           
       
    }
    
}