import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { SideLoginComponent } from './pages/authentication/side-login/side-login.component';
import { SideRegisterComponent } from './pages/authentication/side-register/side-register.component';
import { authGuard } from './guards/auth.guard';
import { CustomersComponent } from './features/customer/customer.component';
import { VehiclesComponent } from './features/vehicles/vehicles.component';
import { OrdersComponent } from './features/order/order.component';
import { SalesComponent } from './features/sale/sale.component';
import { StarterComponent } from './pages/starter/starter.component';



export const routes: Routes = [
  { path: 'blank', component: BlankComponent },
  { path: '', redirectTo: '/authentication/side-login', pathMatch: 'full' },
  { path: 'authentication/side-login', component: SideLoginComponent },
  { path: 'authentication/side-register', component: SideRegisterComponent },
  { path: 'customers', component: CustomersComponent, canActivate: [authGuard] },
  { path: 'vehicles', component: VehiclesComponent, canActivate: [authGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [authGuard] },
  { path: 'sales', component: SalesComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/authentication/side-login' },
  { path: 'Home', component: StarterComponent, canActivate: [authGuard] },
  { path: 'Home1', component: StarterComponent, canActivate: [authGuard] },

{
  path: 'starter', 
  loadChildren: () => import('./pages/pages.routes').then((m) => m.starterRoutes) 
},

];




