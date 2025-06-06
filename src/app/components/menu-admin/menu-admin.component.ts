import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { empresa } from 'src/app/data/empresa';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.scss'],
  standalone: false
})

export class MenuAdminComponent implements OnInit {
  menuType: string = 'overlay';

  public appPages = [
    { title: 'Dashboard', url: '/admin', icon: 'paper-plane' },
  ];
  public menu = [
    { title: 'Agendamentos', url: '/admin/agendamentos', icon: 'calendar' },
    { title: 'Serviços', url: '/admin/servicos', icon: 'storefront' },
  ];
  empresa: any = empresa;
  user: any;

  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router,
    private userService: UsersService
  ) { }

  async ngOnInit() {
    this.user = await this.userService.getUser();
  }

  async logoutAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Terminar Sessão',
      message:
        'Deseja desconectar da sua conta? Terá de fazer novamente o login',
      buttons: [
        {
          text: 'Sair',
          handler: () => {
            this.logout();
            location.reload();
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
      ],
    });
    await alert.present();
  }

  async logout() {
    const response = this.authService.logout();
    this.router.navigate(['/']);
  }

}
