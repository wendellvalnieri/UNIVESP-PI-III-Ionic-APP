import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { MensagensService } from 'src/app/services/mensagens.service';
import { environment } from 'src/environments/environment';
import { SettingsPage } from '../../admin/settings/settings.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent implements OnInit {
  showNewClient: boolean = false;
  showRecuperarPasse: boolean = false;
  env = environment;
  push_token: any;
  constructor(
    private authService: AuthService,
    private mensagensService: MensagensService,
    private router: Router,
    private modalController: ModalController
  ) { }

  async ngOnInit() {
  }

  async onSubmitLogin(form: NgForm) {
    if (form.valid) {
      await this.mensagensService.showLoading();
      const data = form.value;
      const response: any = await this.authService.login(data.username, data.password);


      this.mensagensService.hideLoading();

      if (response.success) {
        await this.authService.setUser(response.data);

        this.router.navigate([`admin`]);

        form.reset();
        return;
      }
      this.mensagensService.showError(response?.message || response);
      return;
    }
    this.mensagensService.showError("Preencha todos os campos corretamente");
  }

  showInformation() {
    this.mensagensService.showAlert("Informações", "Para acessar o sistema, utilize o mesmo login e senha do aplicativo de agendamentos. Caso não tenha acesso, entre em contato com a administração do sistema.");
  }

  async openSettings() {
    const modal = await this.modalController.create({
      component: SettingsPage,
      componentProps: {
      },
      showBackdrop: true,
      backdropDismiss: true
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) { }
    });

    return await modal.present();
  }
}