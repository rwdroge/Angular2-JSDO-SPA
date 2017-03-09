import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginData } from '../_models/index';
import { AlertService, JsdoService } from '../_services/index';


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  @Input()
  logindata: LoginData;
  returnUrl: string;
  loading = false;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: JsdoService,
    private alertService: AlertService) {
     this.logindata = loginService.logindata;
    }
  loginDo(): any {
       this.loginService.login(this.logindata)
       
  }
  
  ngOnInit() {
        // reset login status
        //this.loginService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }


}
