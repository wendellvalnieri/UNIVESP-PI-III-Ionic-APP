import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AgendamentoService } from 'src/app/services/agendamento.service';
import { AppService } from 'src/app/services/app.service';
import { ServicoService } from 'src/app/services/servico.service';

@Component({
  selector: 'app-agendamento-form',
  templateUrl: './agendamento-form.component.html',
  styleUrls: ['./agendamento-form.component.scss'],
  standalone: false
})
export class AgendamentoFormComponent implements OnInit {
  @Input() agendamento: any | null = null;
  @Output() formSubmit = new EventEmitter<any>();

  agendamentoForm: FormGroup;
  servicos: any[] = [];
  isLoading = false;
  dataHoraInvalida = false;

  constructor(
    private fb: FormBuilder,
    private agendamentoService: AgendamentoService,
    private appService: AppService,
    private modalController: ModalController,
    private servicosService: ServicoService
  ) {
    this.agendamentoForm = this.fb.group({
      servicoId: ['', Validators.required],
      data: ['', Validators.required],
      hora: ['', Validators.required],
      observacoes: ['']
    });
  }

  ngOnInit() {
    this.appService.setTitle('Agendamento');

    this.carregarServicos();

    if (this.agendamento) {
      this.carregarAgendamento(parseInt(this.agendamento.id));
    }
  }

  async carregarServicos() {
    const response = await this.servicosService.getAll();
    this.servicos = response;
  }

  async carregarAgendamento(id: number) {
    this.isLoading = true;
    const response = await this.agendamentoService.getAgendamento(id);
    const agendamento = response.data;
    this.agendamento = agendamento
    // Separando a data e hora que vem do backend em formato ISO
    const date = new Date(agendamento.data_reserva);
    const data = date.toISOString().split('T')[0];

    // Formatando a hora como HH:MM
    const horas = agendamento.hora_reserva;

    this.agendamentoForm.patchValue({
      servicoId: String(agendamento.servico_id),
      data: data,
      hora: horas,
      observacoes: agendamento.observacoes
    });
    this.isLoading = false;

  }

  // Função para validar se a data e hora já estão ocupadas
  async validarDisponibilidade() {
    const data = this.agendamentoForm.get('data')?.value;
    const hora = this.agendamentoForm.get('hora')?.value;

    if (data && hora) {
      const dataHora = new Date(`${data}T${hora}`);
      const response = await this.agendamentoService.verificarDisponibilidade(dataHora, this.agendamento.id);
    }
  }

  onSubmit() {
    if (this.agendamentoForm.valid) {
      const formData = this.agendamentoForm.value;

      // Combina data e hora num único objeto Date
      const dataHora = new Date(`${formData.data}T${formData.hora}`);

      const agendamento = {
        id: this.agendamento.id,
        servicoId: formData.servicoId,
        dataHora: dataHora.toISOString(),
        observacoes: formData.observacoes
      };

      this.formSubmit.emit(agendamento);
    }
  }

  dismissModal() {
    this.modalController.dismiss();
  }
}