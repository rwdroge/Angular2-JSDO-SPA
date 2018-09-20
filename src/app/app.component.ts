import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './_services/index';

@Component({
  selector: 'app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})

export class AppComponent { 

  constructor(
    private router: Router,
    private loginService: LoginService) { }
  
  logoutDo(): any  {
    this.loginService.logout();
  }
}
