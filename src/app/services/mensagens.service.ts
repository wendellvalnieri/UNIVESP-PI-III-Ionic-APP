// src/app/services/message.service.ts
import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MensagensService {
  private isLoading = false;
  private loader: any;

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) { }

  /**
   * Exibe uma mensagem toast genérica
   * @param message Mensagem a ser exibida
   * @param duration Duração em milissegundos (padrão: 2000ms)
   * @param position Posição do toast (padrão: bottom)
   * @param color Cor do toast (padrão: primary)
   */
  async showToast(
    message: string,
    duration: number = 2000,
    position: 'top' | 'middle' | 'bottom' = 'bottom',
    color: string = 'primary'
  ) {
    const toast = await this.toastController.create({
      message,
      duration,
      position,
      color,
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ]
    });
    await toast.present();
    return toast;
  }

  /**
   * Exibe uma mensagem toast de sucesso
   * @param message Mensagem de sucesso
   */
  async showSuccess(message: string) {
    return this.showToast(message, 2000, 'bottom', 'success');
  }

  /**
   * Exibe uma mensagem toast de erro
   * @param message Mensagem de erro
   */
  async showError(message: string) {
    return this.showToast(message, 3000, 'bottom', 'danger');
  }

  /**
   * Exibe uma mensagem toast de aviso
   * @param message Mensagem de aviso
   */
  async showWarning(message: string) {
    return this.showToast(message, 3000, 'bottom', 'warning');
  }

  /**
   * Exibe uma mensagem toast informativa
   * @param message Mensagem informativa
   */
  async showInfo(message: string) {
    return this.showToast(message, 2000, 'bottom', 'tertiary');
  }

  /**
   * Exibe um alerta com uma mensagem
   * @param header Título do alerta
   * @param message Mensagem do alerta
   * @param buttons Botões do alerta (padrão: OK)
   */
  async showAlert(header: string, message: string, buttons: any = ['OK']) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons,
      cssClass: 'custom-alert'
    });
    await alert.present();
    return alert;
  }

  /**
   * Exibe um alerta de erro
   * @param message Mensagem de erro
   */
  async showErrorAlert(message: string) {
    return this.showAlert('Erro', message);
  }

  /**
   * Exibe um alerta de confirmação
   * @param header Título do alerta
   * @param message Mensagem do alerta
   * @returns Promise que resolve com true se confirmado, false caso contrário
   */
  async showConfirmation(header: string, message: string): Promise<boolean> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header,
        message,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => resolve(false)
          },
          {
            text: 'Confirmar',
            handler: () => resolve(true)
          }
        ]
      });
      await alert.present();
    });
  }

  /**
   * Exibe um indicador de carregamento
   * @param message Mensagem de carregamento (padrão: 'Carregando...')
   */
  async showLoading(message: string = 'Carregando...') {
    // Previne múltiplos loaders
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.loader = await this.loadingController.create({
      message,
      spinner: 'circles'
    });

    await this.loader.present();
    return this.loader;
  }

  /**
   * Oculta o indicador de carregamento
   */
  async hideLoading() {
    if (this.isLoading) {

      await this.loader.dismiss();
      this.isLoading = false;
    }
  }

  /**
   * Executa uma função com indicador de carregamento
   * @param fn Função a ser executada
   * @param loadingMessage Mensagem de carregamento
   * @returns Promise com o resultado da função
   */
  async withLoading<T>(fn: () => Promise<T>, loadingMessage: string = 'Carregando...'): Promise<T> {
    try {
      await this.showLoading(loadingMessage);
      const result = await fn();
      await this.hideLoading();
      return result;
    } catch (error) {
      await this.hideLoading();
      throw error;
    }
  }


  closeAllAlerts() {
    this.hideLoading();
    this.alertController.dismiss().then(() => {
      this.toastController.dismiss().then(() => {
        this.loadingController.dismiss();
      });
    });
  }
}