import { NgModule }             from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { ItemComponent } from './item/index';
import { PageNotFoundComponent } from './notfound.component';
import { AuthGuard } from './_guards/index';

const routes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard]  },
    { path: 'login', component: LoginComponent },
    { path: 'item', component: ItemComponent, canActivate: [AuthGuard] 
      

    },
    
    // otherwise redirect to home
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: []
})
export class AppRoutingModule {}