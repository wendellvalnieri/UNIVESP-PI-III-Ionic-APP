
import { Injectable } from '@angular/core';
import { PushNotifications, PushNotificationSchema, ActionPerformed, Token } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { FirebaseMessaging } from '@capacitor-firebase/messaging';
import { ApiAxiosService } from './api-axios.service';
import { CrudService } from './crud.service';

@Injectable({
    providedIn: 'root'
})
export class PushNotificationService extends CrudService<any> {
    constructor(apiService: ApiAxiosService) {
        super(apiService, 'notifications');
    }
    async initPushNotifications() {
        const isNative = Capacitor.isNativePlatform();

        if (!isNative) {
            console.log('App está rodando no navegador — Push não habilitado.');
            return;
        }

        // Solicita permissões
        const { receive } = await FirebaseMessaging.requestPermissions();
        if (receive !== 'granted') {
            console.warn('Permissão de push negada');
            return;
        }

        // Obtém o token
        const { token } = await FirebaseMessaging.getToken();
        console.log('Token FCM:', token);

        // Envia o token para sua API
        this.sendTokenToAPI(token);
    }

    private async sendTokenToAPI(token: string) {
        const apiUrl = this.endpoint + '/register-token';
        const data = {
            token_message: token,
        };
        const response = await this.create(apiUrl, data);
        return response;

    }
}