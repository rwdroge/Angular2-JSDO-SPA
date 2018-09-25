import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './_services/index';
import { PanelBarItemModel } from '@progress/kendo-angular-layout';


@Component({
  selector: 'app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})

export class AppComponent { 
  private selectedId: string = '';

  constructor(
    private router: Router,
    private loginService: LoginService) { }
  
  logoutDo(): any  {
    this.loginService.logout("Please login");
  }

  public stateChange(data: Array<PanelBarItemModel>): boolean {
    const focusedEvent: PanelBarItemModel = data.filter(item => item.focused === true)[0];

    if (focusedEvent.title == 'Logout') {
       this.selectedId = focusedEvent.title;
       this.logoutDo();
    }

    return false;
}
}
