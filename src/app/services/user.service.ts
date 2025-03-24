import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiAxiosService } from './api-axios.service';
import { Storage } from '@ionic/storage-angular';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private endpoint: string = 'users';
    private prod_sulfix: string = environment.prod_sulfix;
    private _item: any;

    public get item(): any {
        return this._item;
    }
    public set item(value: any) {
        this._item = value;
    }
    constructor(
        private apiAxios: ApiAxiosService,
        private storage: Storage,
    ) { }

    createUser(data: any) {
        const response = this.apiAxios.create(`${this.prod_sulfix}/${this.endpoint}`, data);
        return response;
    }

    async updateUser(data: any) {
        const response = await this.apiAxios.update(`${this.endpoint}/update`, data);
        if (response.message == 'success') {
            this.setItem(response.data);
        }
        return response;
    }

    recuperarPasse(data: any) {
        const response = this.apiAxios.create(`${this.prod_sulfix}/${this.endpoint}/recuperar-passe`, data);
        return response;
    }

    async setItem(data: any) {
        this.item = data;
        this.setUserDataToLocalStorage(data);
        const token = await this.storage.get('token');

        if (!token) {
            await this.storage.set('token', data.token);
        }
    }

    eraseData() {
        this.item = undefined;
    }

    async getUserDataLocalStorage() {
        const aux = await this.storage.get('cliente');
        if (aux == 'undefined' || aux == undefined) {
            localStorage.clear();
            return;
        }
        try {
            const user = JSON.parse(aux);
            return user;
        } catch (error) {
            return;
        }
    }

    async setUserDataToLocalStorage(data: any) {
        await this.storage.set('cliente', data);
    }

    async getCurrentUser() {
        const token = await this.storage.get('token');
        if (token) {
            const response = this.apiAxios.post(`auth/token`);
            return response;
        }
        return false;
    }

    addInfoUser(data: any) {
        let user = this._item;
        Object.keys(data).forEach((k) => {
            user[k] = data[k];
        });
        this.setUserDataToLocalStorage(user);
    }
}
