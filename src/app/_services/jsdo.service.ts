import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { LoginData } from '../_models/login';
import { AlertService } from '../_services/index';

import { Http } from '@angular/http';

import { progress } from 'jsdo';

var Session = progress.data.JSDOSession;
var JSDO = progress.data.JSDO;
var jsdoOptions = {
  "serviceURI": "http://localhost:9210/RemsOnline",
  "authenticationModel": "form",
  "name": "websecurity"
};
let session = new Session(jsdoOptions);

@Injectable()
export class JsdoService {
  
    
  logindata: LoginData = { 
                          username: '',
                          password: '',
                          customer: '',
                          errorMessage: ''
  };

  constructor(
    private alertService: AlertService,
    private router: Router) { }

  login(logindata): any {
    
    try { 
      var promise = new Promise((resolve, reject) => resolve(session.login(logindata.username + '@' + logindata.customer, logindata.password)));
      promise.then((val) => {
        try { 
          debugger;
          this.router.navigate(['home']);
        } 
        catch(ex) {
          debugger;
          //console.log([{errorObject: ex}]);
        } 
      })
      .catch((val) => {
        if (val[1] == 2) {
          debugger;
          this.alertService.error("Incorrect userid or password");
        } else {
          console.log(val);
        }
        
      }); // end promise.fail
    }
    catch(ex) {
      this.alertService.error("Another error");
    }
  }
  logout(): any {
      session.logout();
      this.router.navigate(['login']);
  }
}
