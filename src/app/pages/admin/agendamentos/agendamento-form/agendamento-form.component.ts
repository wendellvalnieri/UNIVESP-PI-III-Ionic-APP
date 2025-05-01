import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { Agendamento } from 'src/app/models/agendamento.model';
import { AgendamentoService } from 'src/app/services/agendamento.service';
import { AppService } from 'src/app/services/app.service';
import { MensagensService } from 'src/app/services/mensagens.service';
import { ServicoService } from 'src/app/services/servico.service';

@Component({
  selector: 'app-agendamento-form',
  templateUrl: './agendamento-form.component.html',
  styleUrls: ['./agendamento-form.component.scss'],
  standalone: false
})
export class AgendamentoFormComponent implements OnInit {
  @Input() agendamento: any | null = null;
  @Input() servico: any | null = null;
  @Output() formSubmit = new EventEmitter<any>();

  isNew: boolean = true;
  isPage: boolean = false;
  agendamentoForm: FormGroup;
  servicos: any[] = [];
  isLoading = false;
  dataHoraInvalida = false;
  title: string = 'Novo Agendamento';

  constructor(
    private fb: FormBuilder,
    private agendamentoService: AgendamentoService,
    private modalController: ModalController,
    private servicosService: ServicoService,
    private messageService: MensagensService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
  ) {
    this.agendamentoForm = this.fb.group({
      servico_id: ['', Validators.required],
      data_reserva: ['', Validators.required],
      hora_reserva: ['', Validators.required],
      observacoes: ['']
    });
  }

  ngOnInit() {
    this.carregarServicos();

    this.route.queryParams.subscribe(params => {
      if (params['servico_id']) {
        this.isPage = true;
        this.agendamentoForm.patchValue({ servico_id: params['servico_id'] });
      }
    });

    if (this.servico?.id) {
      this.isPage = true;
      this.agendamentoForm.patchValue({ servico_id: this.servico.id });
    }

    if (this.agendamento) {
      this.isNew = false;

      this.title = `${this.agendamento.nome_servico} - R$ ${this.agendamento.preco}`;

      this.carregarAgendamento(this.agendamento);
    }
    if (this.isNew) {
      this.title = 'Novo Agendamento';
    }
  }

  async carregarServicos() {
    const response = await this.servicosService.getAll();
    this.servicos = response.data;
  }

  async carregarAgendamento(agendamento: Agendamento) {
    this.agendamentoForm.disable();
    agendamento.data_reserva = agendamento.data_reserva.substring(0, 10);
    this.agendamentoForm.patchValue(agendamento);
    this.isLoading = false;
  }

  async validarDisponibilidade() {
    const data = this.agendamentoForm.get('data_reserva')?.value;
    const hora = this.agendamentoForm.get('hora_reserva')?.value;

    if (data && hora) {
      const dataHora = new Date(`${data}T${hora}`);
    }
  }

  async onSubmit() {
    if (this.agendamentoForm.valid) {
      this.messageService.showLoading();
      const formData = this.agendamentoForm.value;

      const agendamento = {
        servico_id: formData.servico_id,
        data_reserva: formData.data_reserva,
        hora_reserva: formData.hora_reserva,
        observacoes: formData.observacoes
      };

      const response = await this.agendamentoService.agendar(agendamento);
      this.messageService.hideLoading();
      if (response.success) {
        this.messageService.showSuccess('Agendamento realizado com sucesso!');
        this.modalController.dismiss({ success: true });
      } else {
        this.messageService.showError('Erro ao realizar o agendamento. Tente novamente.');
      }
    }
  }

  async cancelarAgendamento() {
    const response = await this.agendamentoService.showConfirmarCancelamento(this.agendamento);
    if (response) {
      this.messageService.showLoading();
      const cancelamentoResponse = await this.agendamentoService.cancelarAgendamento(this.agendamento.id);
      this.messageService.hideLoading();
      if (cancelamentoResponse.success) {
        this.messageService.showSuccess('Agendamento cancelado com sucesso!');
        this.modalController.dismiss({ success: true });
      } else {
        this.messageService.showError('Erro ao cancelar o agendamento. Tente novamente.');
      }
    }
  }
  goBack() {
    this.navCtrl.back();
  }

  dismissModal() {
    this.modalController.dismiss();
  }
}