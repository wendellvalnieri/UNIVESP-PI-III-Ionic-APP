import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MensagensService } from 'src/app/services/mensagens.service';
import { environment } from 'src/environments/environment';

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
  ) { }

  async ngOnInit(): Promise<void> {
    if (this.authService.isAuthenticated()) {
      this.router.navigate([`admin`, `home`]);
      return;
    }
  }

  async onSubmitLogin(form: NgForm) {
    if (form.valid) {
      await this.mensagensService.showLoading();
      const data = form.value;
      const response: any = await this.authService.login(data.username, data.password);

      this.mensagensService.hideLoading();

      if (response.message == "success") {
        this.authService.setUser(response.data);

        this.router.navigate([`admin`, `sensors`, `list`]);

        this.mensagensService.hideLoading();
        form.reset();
        return;
      }
      this.mensagensService.showError(response.message);
      return;
    }
    this.mensagensService.showError("Preencha todos os campos corretamente");
  }
}