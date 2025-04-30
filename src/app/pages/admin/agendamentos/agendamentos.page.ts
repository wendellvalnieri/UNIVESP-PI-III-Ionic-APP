import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { AgendamentoFormComponent } from './agendamento-form/agendamento-form.component';
import { Agendamento } from 'src/app/models/agendamento.model';
import { AgendamentoService } from 'src/app/services/agendamento.service';
import { MensagensService } from 'src/app/services/mensagens.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.page.html',
  styleUrls: ['./agendamentos.page.scss'],
  standalone: false
})
export class AgendamentosPage implements OnInit {
  agendamentos: Agendamento[] = [];
  agendamentosFiltrados: Agendamento[] = [];
  dataFiltro: string = new Date().toISOString().split('T')[0];
  carregando = false;
  statusFiltro: string = 'todos';

  constructor(
    private agendamentoService: AgendamentoService,
    private modalController: ModalController,
    private mensagensService: MensagensService,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.appService.setTitle('Agendamento');

    this.carregarAgendamentos();
  }

  async carregarAgendamentos() {
    this.carregando = true;

    await this.mensagensService.showLoading('Carregando agendamentos...');

    const data = new Date(this.dataFiltro);
    const response = await this.agendamentoService.getAgendamentosByUser(data);

    this.mensagensService.hideLoading();

    if (response.success) {
      this.agendamentos = response.data;
      this.agendamentosFiltrados = [...this.agendamentos];
    }
    else {
      this.mensagensService.showErrorAlert('Não foi possível carregar os agendamentos. Por favor, tente novamente.');
    }
  }

  async abrirFormulario(agendamento?: Agendamento) {
    const modal = await this.modalController.create({
      component: AgendamentoFormComponent,
      componentProps: {
        agendamento: agendamento,
      },
      showBackdrop: true,
      backdropDismiss: true
    });

    return await modal.present();
  }

  onDataChange() {
    this.carregarAgendamentos();
  }

  filtrarPorStatus() {
    if (this.statusFiltro === 'todos') {
      this.agendamentosFiltrados = [...this.agendamentos];
    } else {
      this.agendamentosFiltrados = this.agendamentos.filter(
        (agendamento) => agendamento.status === this.statusFiltro
      );
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case "cancelado":
        return 'secondary';
      case "agendado":
        return 'success';
      case "finalizado":
        return 'danger';
      default:
        return 'medium';
    }
  }
}