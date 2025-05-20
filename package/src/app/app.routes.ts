import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { SideRegisterComponent } from './pages/authentication/side-register/side-register.component';
import { SideLoginComponent } from './pages/authentication/side-login/side-login.component';
import { VehicleListComponent } from './features/vehicles/vehicle-list/vehicle-list.component';
import { OrderListComponent } from './features/orders/order-list/order-list.component';
import { SaleListComponent } from './features/sales/sale-list/sale-list.component';
import { StarterComponent } from './pages/starter/starter.component';
import { AuthGuard } from './guards/auth.guard';


export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'auth/login', 
    pathMatch: 'full' 
  },
  {
    path: 'auth',
    children: [
      { path: 'login', component: SideLoginComponent },
      { path: 'register', component: SideRegisterComponent }
    ]
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.routes').then(
            (m) => m.UiComponentsRoutes
          ),
      },
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },

      { path: 'starter', component: StarterComponent, canActivate: [AuthGuard] },

      { path: 'vehicles', component: VehicleListComponent, canActivate: [AuthGuard] },
      { path: 'orders', component: OrderListComponent, canActivate: [AuthGuard] },
      { path: 'sales', component: SaleListComponent, canActivate: [AuthGuard] },
    ],
  },

];
