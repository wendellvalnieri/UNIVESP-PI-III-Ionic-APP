// src/app/pages/agendamentos/agendamento-form/agendamento-form.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { Cliente } from 'src/app/models/cliente.model';
import { Servico } from 'src/app/models/servico.model';
import { AgendamentoService } from 'src/app/services/agendamento.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { ServicoService } from 'src/app/services/servico.service';

@Component({
  selector: 'app-agendamento-form',
  templateUrl: './agendamento-form.component.html',
  styleUrls: ['./agendamento-form.component.scss'],
  standalone: false
})
export class AgendamentoFormComponent implements OnInit {
  clientes: Cliente[] = [];
  servicos: Servico[] = [];
  horarios: string[] = [];
  modo: 'criar' | 'editar' = 'criar';

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private agendamentoService: AgendamentoService,
    private clienteService: ClienteService,
    private servicoService: ServicoService
  ) { }

  ngOnInit() {
  /*   this.inicializarFormulario();
    this.carregarClientes();
    this.carregarServicos();
    this.gerarHorarios(); */
/* 
    if (this.agendamento) {
      this.modo = 'editar';
      this.preencherFormulario(this.agendamento);
    } */
  }
/* 
  inicializarFormulario() {
    this.agendamentoForm = this.formBuilder.group({
      clienteId: ['', Validators.required],
      servicoId: ['', Validators.required],
      data: [new Date().toISOString().split('T')[0], Validators.required],
      horario: ['', Validators.required],
      observacoes: ['']
    });

    // Atualizar preço quando o serviço mudar
    this.agendamentoForm.get('servicoId').valueChanges.subscribe(servicoId => {
      if (servicoId) {
        const servico = this.servicos.find(s => s.id === +servicoId);
        if (servico) {
          this.verificarDisponibilidade();
        }
      }
    });

    // Verificar disponibilidade quando data ou horário mudar
    this.agendamentoForm.get('data').valueChanges.subscribe(() => {
      this.verificarDisponibilidade();
    });

    this.agendamentoForm.get('horario').valueChanges.subscribe(() => {
      this.verificarDisponibilidade();
    });
  }

  preencherFormulario(agendamento: Agendamento) {
    this.agendamentoForm.patchValue({
      clienteId: agendamento.clienteId,
      servicoId: agendamento.servicoId,
      data: agendamento.data,
      horario: agendamento.horario,
      observacoes: agendamento.observacoes || ''
    });
  }

  async carregarClientes() {
    const loading = await this.loadingController.create({
      message: 'Carregando clientes...'
    });
    await loading.present();

    this.clienteService.getClientes().subscribe(
      (clientes) => {
        this.clientes = clientes;
        loading.dismiss();
      },
      async (error) => {
        console.error('Erro ao carregar clientes:', error);
        loading.dismiss();

        const alert = await this.alertController.create({
          header: 'Erro',
          message: 'Não foi possível carregar a lista de clientes.',
          buttons: ['OK']
        });
        await alert.present();
      }
    );
  }

  async carregarServicos() {
    const loading = await this.loadingController.create({
      message: 'Carregando serviços...'
    });
    await loading.present();

    this.servicoService.getServicos().subscribe(
      (servicos) => {
        this.servicos = servicos;
        loading.dismiss();
      },
      async (error) => {
        console.error('Erro ao carregar serviços:', error);
        loading.dismiss();

        const alert = await this.alertController.create({
          header: 'Erro',
          message: 'Não foi possível carregar a lista de serviços.',
          buttons: ['OK']
        });
        await alert.present();
      }
    );
  }

  gerarHorarios() {
    // Gera horários das 8h às 18h com intervalos de 30 minutos
    const horarios = [];
    for (let hora = 8; hora < 18; hora++) {
      horarios.push(`${hora.toString().padStart(2, '0')}:00`);
      horarios.push(`${hora.toString().padStart(2, '0')}:30`);
    }
    this.horarios = horarios;
  }

  async verificarDisponibilidade() {
    const data = this.agendamentoForm.get('data').value;
    const horario = this.agendamentoForm.get('horario').value;

    if (!data || !horario) {
      return;
    }

    // Verificar apenas se estiver criando um novo agendamento
    if (this.modo === 'criar') {
      this.agendamentoService.verificarDisponibilidade(data, horario).subscribe(
        (disponivel) => {
          if (!disponivel) {
            this.alertController.create({
              header: 'Horário indisponível',
              message: 'Este horário já está ocupado. Por favor, selecione outro horário.',
              buttons: ['OK']
            }).then(alert => alert.present());

            this.agendamentoForm.get('horario').setValue('');
          }
        },
        (error) => {
          console.error('Erro ao verificar disponibilidade:', error);
        }
      );
    }
  }

  async salvar() {
    if (this.agendamentoForm.invalid) {
      this.alertController.create({
        header: 'Formulário inválido',
        message: 'Por favor, preencha todos os campos obrigatórios.',
        buttons: ['OK']
      }).then(alert => alert.present());
      return;
    }

    const loading = await this.loadingController.create({
      message: this.modo === 'criar' ? 'Criando agendamento...' : 'Atualizando agendamento...'
    });
    await loading.present();

    // Obter valores do formulário
    const formValues = this.agendamentoForm.value;

    // Buscar cliente e serviço para incluir nomes
    const cliente = this.clientes.find(c => c.id === +formValues.clienteId);
    const servico = this.servicos.find(s => s.id === +formValues.servicoId);

    if (!cliente || !servico) {
      loading.dismiss();
      this.alertController.create({
        header: 'Erro',
        message: 'Cliente ou serviço não encontrado.',
        buttons: ['OK']
      }).then(alert => alert.present());
      return;
    }

    const agendamentoData: Agendamento = {
      ...formValues,
      clienteNome: cliente.nome,
      servicoNome: servico.nome,
      valor: servico.preco,
      status: 'agendado'
    };

    // Se estiver editando, mantém o ID e atualiza
    if (this.modo === 'editar' && this.agendamento) {
      agendamentoData.id = this.agendamento.id;

      this.agendamentoService.updateAgendamento(this.agendamento.id, agendamentoData).subscribe(
        () => {
          loading.dismiss();
          this.modalController.dismiss(true);
        },
        async (error) => {
          console.error('Erro ao atualizar agendamento:', error);
          loading.dismiss();

          const alert = await this.alertController.create({
            header: 'Erro',
            message: 'Não foi possível atualizar o agendamento.',
            buttons: ['OK']
          });
          await alert.present();
        }
      );
    } else {
      // Cria um novo agendamento
      this.agendamentoService.addAgendamento(agendamentoData).subscribe(
        () => {
          loading.dismiss();
          this.modalController.dismiss(true);
        },
        async (error) => {
          console.error('Erro ao criar agendamento:', error);
          loading.dismiss();

          const alert = await this.alertController.create({
            header: 'Erro',
            message: 'Não foi possível criar o agendamento.',
            buttons: ['OK']
          });
          await alert.present();
        }
      );
    }
  }

  cancelar() {
    this.modalController.dismiss();
  }

  getServicoPreco(servicoId: number): number {
    const servico = this.servicos.find(s => s.id === servicoId);
    return servico ? servico.preco : 0;
  } */
}