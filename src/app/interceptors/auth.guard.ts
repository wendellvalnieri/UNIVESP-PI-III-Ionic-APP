import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    async canActivate(): Promise<any> {
        const isAuthenticated = await this.authService.isAuthenticated();
        if (isAuthenticated) {
            return true;
        } else {
            this.router.navigate(['/public/login']);
            return false;
        }
    }
}