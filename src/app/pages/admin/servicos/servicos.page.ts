import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
import { MensagensService } from 'src/app/services/mensagens.service';
import { ServicoService } from 'src/app/services/servico.service';
import { Servico } from './servico.interface';
import { ServicoDetalheComponent } from './servico-detalhe/servico-detalhe.component';
import { Router } from '@angular/router';

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
    private modalController: ModalController,
    private router: Router
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

  goToAgendamento(event: Event, id: string) {
    event.stopPropagation();

    this.router.navigate(['admin/agendamentos/form'], {
      queryParams: {
        servico_id: id,
      }
    });
  }

  getDefaultImage(): string {
    return 'assets/images/default-service.png';
  }
}
