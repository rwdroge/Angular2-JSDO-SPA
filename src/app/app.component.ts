import { Component } from '@angular/core';
import { JsdoService } from './_services/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})

export class AppComponent { 

  constructor(
    private loginService: JsdoService,
    private router: Router) { }
    
  logoutDo(): any  {
    this.loginService.logout();
  }

}
