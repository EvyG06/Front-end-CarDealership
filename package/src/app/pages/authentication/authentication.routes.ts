import { Routes } from '@angular/router';
import { SideLoginComponent } from './side-login/side-login.component'; 
import { SideRegisterComponent } from './side-register/side-register.component'; 

export const AuthenticationRoutes: Routes = [
  { path: '', redirectTo: 'side-login', pathMatch: 'full' },
  { path: 'side-login', component: SideLoginComponent },
  { path: 'side-register', component: SideRegisterComponent }
];
