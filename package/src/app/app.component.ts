import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { NavService } from './services/nav.service';
import { User } from './models/users.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Flexy Dealership';
  currentUser: User | null = null;
  isAuthenticated = false;
  currentRoute = '';
  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private navService: NavService
  ) {}

  ngOnInit(): void {
    // Suscribirse a cambios de autenticación
    this.authService.currentUser
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser = user;
        this.isAuthenticated = !!user;
      });

    // Trackear cambios de ruta
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: any) => {
        this.currentRoute = event.urlAfterRedirects || event.url;
   
      });

    // Cargar datos iniciales si está autenticado
    if (this.authService.currentUser) {
      this.loadInitialData();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadInitialData(): void {
    // Aquí puedes cargar datos necesarios para toda la aplicación
    // como configuraciones, notificaciones, etc.
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/authentication/login']);
  }


}
