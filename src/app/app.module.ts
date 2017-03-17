import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GridModule } from '@progress/kendo-angular-grid';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router';
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, JsdoService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';

import { AppRoutingModule } from './app-routing.module';
import { ButtonsModule } from '@progress/kendo-angular-buttons';



@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ButtonsModule,
    GridModule
  ],
  providers: [
    AuthGuard,
    AlertService,
    JsdoService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
