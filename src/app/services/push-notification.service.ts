
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
        super(apiService, 'notificacoes');
    }
    async initPushNotifications() {
        const isNative = Capacitor.isNativePlatform();

        if (!isNative) {
            console.log('App está rodando no navegador — Push não habilitado.');
            return false;
        }
        const { receive } = await FirebaseMessaging.requestPermissions();
        if (receive !== 'granted') {
            console.warn('Permissão de push negada');
            return false;
        }
        PushNotifications.register();

        const { token } = await FirebaseMessaging.getToken();
        console.log('Token FCM:', token);
        
        const responseSendToken = await this.sendTokenToAPI(token);
        if (responseSendToken) {
            return true;
        }
        console.error('SendTokenError:', token);
        return false;
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