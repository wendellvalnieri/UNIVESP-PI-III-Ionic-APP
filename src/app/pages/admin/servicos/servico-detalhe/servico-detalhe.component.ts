import { Component, Input, input, OnInit } from '@angular/core';
import { Servico } from '../servico.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, LoadingController, ToastController, ModalController } from '@ionic/angular';
import { async } from 'rxjs';

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
    private router: Router
  ) { }

  ngOnInit() { }

  getDefaultImage(): string {
    return 'assets/images/default-service.png';
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  goToAgendamento() {
    this.modalController.dismiss();
    this.router.navigate(['admin/agendamentos/form'], {
      queryParams: {
        servico_id: this.servico?.id,
      }
    });
  }
}
