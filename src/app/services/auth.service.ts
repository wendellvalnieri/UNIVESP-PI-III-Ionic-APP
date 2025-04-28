import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Usuario } from '../models/usuario.model';
import { UsersService } from './user.service';
import { ApiAxiosService } from './api-axios.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<Usuario | null>;
    public currentUser: Observable<Usuario | null>;
    private jwtHelper = new JwtHelperService();
    private endpoint: string = 'auth';
    private _storage: Storage | null = null;
    private authState = new BehaviorSubject(false);


    constructor(
        private apiAxios: ApiAxiosService,
        private storage: Storage,
        private userService: UsersService
    ) {
        this.currentUserSubject = new BehaviorSubject<Usuario | null>(null);
        this.currentUser = this.currentUserSubject.asObservable();
        this.init();
    }

    async init() {

        const storage = await this.storage.create();
        this._storage = storage;

        this.checkToken();
    }

    async checkToken() {
        const token = await this._storage?.get('token');
        if (token) {
            this.authState.next(true);
            return true;
        }
        this.authState.next(false);
        return false;
    }

    async setUser(data: any) {
        await this._storage?.set('token', data.token);
        this.authState.next(true);

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

    login(username: string, password: string) {
        const data = {
            username: username,
            password: password,
            isApp: true,
        };
        const response = this.apiAxios.post(`${this.endpoint}/login`, data);
        return response;
    }

    async logout() {
        await this.storage.remove('token');
        await this._storage?.remove('token');
        this.authState.next(false);
        this.currentUserSubject.next(null);
    }

    async verifyToken() {
        const token = await this.storage.get('token');
        console.log(token);

        if (token) {
            const response = await this.apiAxios.post(`${this.endpoint}/token`, []);
            if (response?.data?.length == 0 || response?.data?.ativo != 1) return false;
            return response;
        }
        return false;
    }


    isAuthenticated() {
        return this.authState.asObservable();

        /*  const currentUser = this.currentUserSubject.value;
         if (!currentUser || !currentUser.token) {
             return false;
         }
         return !this.jwtHelper.isTokenExpired(currentUser.token); */
    }

    getToken(): string | null {
        const currentUser: any = this.currentUserSubject.value;
        return currentUser ? currentUser?.token : null;
    }

    getCurrentUser(): Usuario | null {
        return this.currentUserSubject.value;
    }
}