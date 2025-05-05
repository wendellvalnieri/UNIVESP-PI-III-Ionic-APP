import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AccessibilityService } from './services/accessibility.service';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false
})
export class AppComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
    private platform: Platform,
    private accessibilityService: AccessibilityService

  ) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.platform.ready();
    await this.accessibilityService.init();
  }


  goToInit() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}