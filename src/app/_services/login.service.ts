import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { LoginData } from '../_models/login';
import { AlertService } from '../_services/index';

import { Http } from '@angular/http';
import { progress } from "@progress/jsdo-core";
import { DataResult, DataSource, DataSourceOptions } from "@progress/jsdo-angular";



@Injectable()
export class LoginService {
  private dataSource: DataSource;
  public isLoggedIn:boolean = false;
  logindata: LoginData = { 
                          username: '',
                          password: ''
  };
  session: progress.data.JSDOSession;
  
  constructor(
    private alertService: AlertService,
    private router: Router) {
  }

  login(logindata): any {

    progress.data.getSession({
      serviceURI: "http://192.168.137.4:8810/Sports2017",
      catalogURI: "http://192.168.137.4:8810/Sports2017/static/Sports2017Service.json",
      authenticationModel: "form",
      username: this.logindata.username,
      password: this.logindata.password,
      name: "websecurity"
    }).then((koekoek) => {
        this.dataSource = new DataSource({
            jsdo: new progress.data.JSDO({
                name: 'item'
            })
        });
        this.session = koekoek.jsdosession;
        this.isLoggedIn = true;
        this.router.navigate(['/item']);
    }, () => {
      this.isLoggedIn = false;
      this.alertService.error("Error while creating session");
    });
  }

  logout(): any {
      progress.data.invalidateAllSessions()
        .then((result) => {
          this.router.navigate(['/login']);
      }).catch((result) => {
          this.alertService.error(result.result, result.info);
      })
      
  }
}
