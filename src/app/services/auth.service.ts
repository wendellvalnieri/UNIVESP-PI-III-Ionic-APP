import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from './api.service';
import { Usuario } from '../models/usuario.model';
import { UsersService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<Usuario | null>;
    public currentUser: Observable<Usuario | null>;
    private jwtHelper = new JwtHelperService();

    constructor(
        private apiService: ApiService,
        private storage: Storage,
        private userService: UsersService
    ) {
        this.currentUserSubject = new BehaviorSubject<Usuario | null>(null);
        this.currentUser = this.currentUserSubject.asObservable();
        this.initStorage();
    }

    async initStorage() {
        await this.storage.create();
        const token = await this.storage.get('token');
        if (token) {
            this.loadUserFromToken(token);
        }
    }

    setUser(data: any) {
        this.userService.setItem(data);
    }
    private loadUserFromToken(token: string) {
        try {
            const decodedToken = this.jwtHelper.decodeToken(token);
            if (!this.jwtHelper.isTokenExpired(token)) {
                const user: Usuario = {
                    id: decodedToken.id,
                    nome: decodedToken.nome,
                    email: decodedToken.email,
                    perfil: decodedToken.perfil,
                    token: token
                };
                this.currentUserSubject.next(user);
            } else {
                this.logout();
            }
        } catch (error) {
            console.error('Erro ao decodificar token:', error);
            this.logout();
        }
    }

    login(email: string, password: string): Observable<Usuario> {
        return this.apiService.post<{ token: string, usuario: Usuario }>('auth/login', { email, password })
            .pipe(
                tap(async response => {
                    await this.storage.set('token', response.token);
                    const user = response.usuario;
                    user.token = response.token;
                    this.currentUserSubject.next(user);
                }),
                map(response => response.usuario)
            );
    }

    async logout() {
        await this.storage.remove('token');
        this.currentUserSubject.next(null);
    }

    isAuthenticated(): boolean {
        const currentUser = this.currentUserSubject.value;
        if (!currentUser || !currentUser.token) {
            return false;
        }
        return !this.jwtHelper.isTokenExpired(currentUser.token);
    }

    getToken(): string | null {
        const currentUser: any = this.currentUserSubject.value;
        return currentUser ? currentUser?.token : null;
    }

    getCurrentUser(): Usuario | null {
        return this.currentUserSubject.value;
    }
}