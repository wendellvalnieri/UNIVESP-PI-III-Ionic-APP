import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Usuario } from '../models/usuario.model';
import { UsersService } from './user.service';
import { ApiAxiosService } from './api-axios.service';
import { PushNotificationService } from './push-notification.service';

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
        private userService: UsersService,
        private notificationsService: PushNotificationService
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
        await this._storage?.set('user', data);

        const responsePushNotification = await this.notificationsService.initPushNotifications();

        this.authState.next(true);
        this.userService.setItem(data);
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


    async isAuthenticated() {
        const token = await this.getToken();
        if(token) return true;
        return false;

        /*  const currentUser = this.currentUserSubject.value;
         if (!currentUser || !currentUser.token) {
             return false;
         }
         return !this.jwtHelper.isTokenExpired(currentUser.token); */
    }

    async getToken() {
        return await this.storage.get('token');
    }

    getCurrentUser(): Usuario | null {
        return this.currentUserSubject.value;
    }
}