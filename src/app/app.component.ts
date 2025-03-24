import { Component } from '@angular/core';
import { Event, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false
})
export class AppComponent {
  pagesNoAuth = ['', 'public/login', 'public/politica-privacidade'];

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UsersService,
  ) {
    this.router.events.subscribe(async (event: Event) => {
      if (event instanceof NavigationStart) {
        if (this.pagesNoAuth.filter((a: any) => `/${a}` == event.url).length == 0) {
          if (!this.userService.item) {
            this.goToInit();
            return;
          }
          const response = await this.authService.verifyToken();
          if (response) {
            this.userService.item = response.data;
            return;
          }
          this.goToInit();
        }
      }
      if (event instanceof NavigationEnd) {
      }
      if (event instanceof NavigationError) {
        console.log(event.error);
      }
    });
  }

  goToInit() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}