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

  limparFiltros() {
    this.dataFiltro = "";

    this.statusFiltro = 'todos';

    this.agendamentosFiltrados = [...this.agendamentos];
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
    modal.onDidDismiss().then((data) => {
      if (data?.data?.success) {
        this.carregarAgendamentos();
      }
    });
    return await modal.present();
  }

  onDataChange() {
    this.agendamentosFiltrados = this.agendamentos.filter(
      (agendamento) => agendamento.data_reserva.substring(0, 10) === this.dataFiltro
    );

    //this.carregarAgendamentos();
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