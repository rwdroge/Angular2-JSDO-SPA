import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GridModule } from '@progress/kendo-angular-grid';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './notfound.component';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, LoginService, itemService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { ItemComponent } from './item/index';

import { AppRoutingModule } from './app-routing.module';
import { ButtonsModule } from '@progress/kendo-angular-buttons';



@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ButtonsModule,
    GridModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    AlertService,
    LoginService,
    itemService
    
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
