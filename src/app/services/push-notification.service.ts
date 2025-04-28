
import { Injectable } from '@angular/core';
import { PushNotifications, PushNotificationSchema, ActionPerformed, Token } from '@capacitor/push-notifications';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Injectable({
    providedIn: 'root'
})
export class PushNotificationService {

    private PUSH_TOKEN_KEY = 'pushToken';

    constructor(
        private router: Router,
        private platform: Platform,
        private storage: Storage
    ) {
        this.initStorage();
    }

    private async initStorage() {
        await this.storage.create();
    }

    public async initPushNotifications(): Promise<void> {
        if (!this.platform.is('capacitor')) {
            console.log('Push notifications não suportadas neste ambiente');
            return;
        }

        const permStatus = await PushNotifications.requestPermissions();

        if (permStatus.receive === 'granted') {
            await PushNotifications.register();

            this.setupListeners();
        } else {
            console.log('Permissão de push notification negada');
        }
    }

    private setupListeners(): void {
        PushNotifications.addListener('registration',
            (token: Token) => {
                console.log('Token de push notification:', token.value);
                this.saveTokenToServer(token.value);
            }
        );

        PushNotifications.addListener('registrationError',
            (error: any) => {
                console.error('Erro no registro de push notifications:', error);
            }
        );

        PushNotifications.addListener('pushNotificationReceived',
            (notification: PushNotificationSchema) => {
                console.log('Notificação recebida:', notification);
                this.handleNotification(notification);
            }
        );

        PushNotifications.addListener('pushNotificationActionPerformed',
            (action: ActionPerformed) => {
                console.log('Ação executada:', action);
                this.handleNotificationAction(action);
            }
        );
    }

    private async saveTokenToServer(token: string): Promise<void> {
        await this.storage.set(this.PUSH_TOKEN_KEY, token);
    }

  
    private handleNotification(notification: PushNotificationSchema): void {
        if (notification.data) {
            this.processNotificationData(notification.data);
        }
    }
  
    private processNotificationData(data: any): void {
        console.log('Dados da notificação:', data);
    }

    private handleNotificationAction(action: ActionPerformed): void {
        const notification = action.notification;

        if (notification.data && notification.data.route) {
            this.router.navigate([notification.data.route]);
        }

        if (notification.data) {
            this.processNotificationData(notification.data);
        }
    }

    public async getToken(): Promise<string | null> {
        return await this.storage.get(this.PUSH_TOKEN_KEY);
    }

    public async unregister(): Promise<void> {
        await PushNotifications.unregister();
        await this.storage.remove(this.PUSH_TOKEN_KEY);
        console.log('Registro de push notifications removido');
    }
}