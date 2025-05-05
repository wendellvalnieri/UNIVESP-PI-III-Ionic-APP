import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
import { MensagensService } from 'src/app/services/mensagens.service';
import { ServicoService } from 'src/app/services/servico.service';
import { Servico } from './servico.interface';
import { ServicoDetalheComponent } from './servico-detalhe/servico-detalhe.component';
import { Router } from '@angular/router';
import { AgendamentoFormComponent } from '../agendamentos/agendamento-form/agendamento-form.component';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.page.html',
  styleUrls: ['./servicos.page.scss'],
  standalone: false
})

export class ServicosPage implements OnInit {
  carregando = false;
  servicos: Servico[] = [];

  servicosFiltrados: Servico[] = [];
  searchTerm: string = '';

  constructor(
    private appService: AppService,
    private mensagensService: MensagensService,
    private servicoService: ServicoService,
    private router: Router,
    private modalController: ModalController,
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
    this.servicosFiltrados = [...this.servicos];
  }

  async abrirDetalhesServico(servico: Servico) {
    const modal = await this.modalController.create({
      component: ServicoDetalheComponent,
      componentProps: {
        servico: servico,
      },
      showBackdrop: true,
      backdropDismiss: true
    });

    modal.onDidDismiss().then((data) => {

    });

    return await modal.present();
  }

  filtrarServico() {
    if (!this.searchTerm) {
      this.servicosFiltrados = [...this.servicos];
      return;
    }

    const searchTermLower = this.searchTerm.toLowerCase();
    this.servicosFiltrados = this.servicos.filter(servico =>
      servico.nome.toLowerCase().includes(searchTermLower) ||
      (servico.descricao && servico.descricao.toLowerCase().includes(searchTermLower))
    );
  }

  formatarPreco(price: string): string {
    const priceNum = parseFloat(price);
    if (priceNum === 0) {
      return 'Consulte';
    }
    return `R$ ${priceNum.toFixed(2).replace('.', ',')}`;
  }

  async goToAgendamento(event: Event, id: string) {
    event.stopPropagation();
    const modal = await this.modalController.create({
      component: AgendamentoFormComponent,
      componentProps: {
        servico: {
          id: id
        },
      },
      showBackdrop: true,
      backdropDismiss: true
    });

    return modal.present();
  }

  getDefaultImage(): string {
    return 'assets/images/default-service.png';
  }
}
