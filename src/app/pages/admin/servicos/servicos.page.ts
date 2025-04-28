import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
import { MensagensService } from 'src/app/services/mensagens.service';
import { ServicoService } from 'src/app/services/servico.service';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.page.html',
  styleUrls: ['./servicos.page.scss'],
  standalone: false
})
export class ServicosPage implements OnInit {
  carregando = false;
  servicos: any[] = [];
  constructor(
    private appService: AppService,
    private mensagensService: MensagensService,
    private servicoService: ServicoService
  ) { }

  ngOnInit() {
    this.appService.setTitle('Serviços');
    this.carregarServicos();
  }

  async carregarServicos() {
    this.carregando = true;

    await this.mensagensService.showLoading('Carregando serviços...');

    const response = await this.servicoService.getAll();

    this.mensagensService.hideLoading();
    this.carregando = false;

    if (!response.success) {
      this.carregando = false;
      this.mensagensService.showError(response.message);
      return;
    }

    this.servicos = response.data;

  }
}
