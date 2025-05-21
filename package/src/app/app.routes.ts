import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { Route } from '@angular/router';
import { SideLoginComponent } from './pages/authentication/side-login/side-login.component';
import { SideRegisterComponent } from './pages/authentication/side-register/side-register.component';
import { AuthGuard } from './guards/auth.guard';
import { CustomersComponent } from './features/customer/customer.component';
import { VehiclesComponent } from './features/vehicles/vehicles.component';
import { OrdersComponent } from './features/order/order.component';
import { SaleComponent } from './features/sale/sale.component';

export const routes: Routes = [
  { path: '', redirectTo: '/authentication/side-login', pathMatch: 'full' },
  { path: 'authentication/side-login', component: SideLoginComponent },
  { path: 'authentication/side-register', component: SideRegisterComponent },
  { path: 'customers', component: CustomersComponent, canActivate: [AuthGuard] },
  { path: 'vehicles', component: VehiclesComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'sales', component: SaleComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/authentication/side-login' } 
];
