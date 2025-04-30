import { Component, Input, OnInit } from '@angular/core';
import { Servico } from '../servico.interface';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AgendamentoFormComponent } from '../../agendamentos/agendamento-form/agendamento-form.component';

@Component({
  selector: 'app-servico-detalhe',
  templateUrl: './servico-detalhe.component.html',
  styleUrls: ['./servico-detalhe.component.scss'],
  standalone: false
})
export class ServicoDetalheComponent implements OnInit {
  @Input() servico: Servico | null = null;
  loading = false;
  selectedDate: string = '';
  selectedTime: string = '';

  constructor(
    private modalController: ModalController,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  getDefaultImage(): string {
    return 'assets/images/default-service.png';
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  async goToAgendamento() {
    this.dismissModal();
    const modal = await this.modalController.create({
      component: AgendamentoFormComponent,
      componentProps: {
        servico: this.servico,
      },
      showBackdrop: true,
      backdropDismiss: true
    });

    return modal.present();
    /*     this.modalController.dismiss();
    
        this.router.navigate(['admin/agendamentos/form'], {
          queryParams: {
            servico_id: this.servico?.id,
          }
        }); */
  }
}
