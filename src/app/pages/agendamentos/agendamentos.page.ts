// src/app/pages/agendamentos/agendamentos.page.ts
import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { AgendamentoService } from '../../services/agendamento.service';
import { AgendamentoFormComponent } from './agendamento-form/agendamento-form.component';
import { Agendamento } from 'src/app/models/agendamento.model';

@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.page.html',
  styleUrls: ['./agendamentos.page.scss'],
  standalone: false
})
export class AgendamentosPage implements OnInit {
  agendamentos: Agendamento[] = [];
  dataFiltro: string = new Date().toISOString().split('T')[0];
  carregando = false;

  constructor(
    private agendamentoService: AgendamentoService,
    private modalController: ModalController,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.carregarAgendamentos();
  }

  async carregarAgendamentos() {
    this.carregando = true;

    const loading = await this.loadingController.create({
      message: 'Carregando agendamentos...'
    });
    await loading.present();

    const data = new Date(this.dataFiltro);
    this.agendamentoService.getAgendamentosPorDia(data).subscribe(
      (agendamentos) => {
        this.agendamentos = agendamentos;
        this.carregando = false;
        loading.dismiss();
      },
      async (error) => {
        console.error('Erro ao carregar agendamentos:', error);
        this.carregando = false;
        loading.dismiss();

        const alert = await this.alertController.create({
          header: 'Erro',
          message: 'Não foi possível carregar os agendamentos. Por favor, tente novamente.',
          buttons: ['OK']
        });
        await alert.present();
      }
    );
  }

  async abrirFormulario(agendamento?: Agendamento) {
    const modal = await this.modalController.create({
      component: AgendamentoFormComponent,
      componentProps: {
        agendamento: agendamento
      }
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.carregarAgendamentos();
      }
    });

    return await modal.present();
  }

  async confirmarCancelamento(agendamento: Agendamento) {
    const alert = await this.alertController.create({
      header: 'Confirmar cancelamento',
      message: `Deseja realmente cancelar este agendamento de ${agendamento.clienteNome}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.cancelarAgendamento(agendamento.id);
          }
        }
      ]
    });

    await alert.present();
  }

  async cancelarAgendamento(id: number) {
    const loading = await this.loadingController.create({
      message: 'Cancelando agendamento...'
    });
    await loading.present();

    this.agendamentoService.cancelarAgendamento(id).subscribe(
      () => {
        loading.dismiss();
        this.carregarAgendamentos();
      },
      async (error) => {
        console.error('Erro ao cancelar agendamento:', error);
        loading.dismiss();

        const alert = await this.alertController.create({
          header: 'Erro',
          message: 'Não foi possível cancelar o agendamento. Por favor, tente novamente.',
          buttons: ['OK']
        });
        await alert.present();
      }
    );
  }

  async concluirAgendamento(id: number) {
    const loading = await this.loadingController.create({
      message: 'Concluindo agendamento...'
    });
    await loading.present();

    this.agendamentoService.concluirAgendamento(id).subscribe(
      () => {
        loading.dismiss();
        this.carregarAgendamentos();
      },
      async (error) => {
        console.error('Erro ao concluir agendamento:', error);
        loading.dismiss();

        const alert = await this.alertController.create({
          header: 'Erro',
          message: 'Não foi possível concluir o agendamento. Por favor, tente novamente.',
          buttons: ['OK']
        });
        await alert.present();
      }
    );
  }

  onDataChange() {
    this.carregarAgendamentos();
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'agendado':
        return 'primary';
      case 'concluido':
        return 'success';
      case 'cancelado':
        return 'danger';
      default:
        return 'medium';
    }
  }
}