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
  dataFiltro: string = new Date().toISOString().split('T')[0];
  carregando = false;

  constructor(
    private agendamentoService: AgendamentoService,
    private modalController: ModalController,
    private alertController: AlertController,
    private loadingController: LoadingController,
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
      message: `Deseja realmente cancelar este agendamento de ${agendamento.nome_cliente}?`,
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

    /* this.agendamentoService.cancelarAgendamento(id).subscribe(
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
    ); */
  }

  async concluirAgendamento(id: number) {
    const loading = await this.loadingController.create({
      message: 'Concluindo agendamento...'
    });
    await loading.present();

    /*  this.agendamentoService.concluirAgendamento(id).subscribe(
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
     ); */
  }

  onDataChange() {
    this.carregarAgendamentos();
  }

  getStatusColor(status: number): string {
    switch (status) {
      case 1:
        return 'primary';
      case 2:
        return 'success';
      case 3:
        return 'danger';
      default:
        return 'medium';
    }
  }
}