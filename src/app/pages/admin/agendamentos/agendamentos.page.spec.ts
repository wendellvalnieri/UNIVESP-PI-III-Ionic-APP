import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgendamentosPage } from './agendamentos.page';
import { AgendamentoService } from 'src/app/services/agendamento.service';
import { ModalController } from '@ionic/angular';
import { MensagensService } from 'src/app/services/mensagens.service';
import { AppService } from 'src/app/services/app.service';
import { of } from 'rxjs';
import { Agendamento } from 'src/app/models/agendamento.model';

// Mocks
const mockAgendamentoService = {
  getAgendamentosByUser: jasmine.createSpy().and.resolveTo({
    success: true,
    data: [
      { data_reserva: '2025-05-05T10:00:00.000Z', status: 'agendado' }
    ] as Agendamento[]
  })
};

const mockMensagensService = {
  showLoading: jasmine.createSpy().and.resolveTo(),
  hideLoading: jasmine.createSpy(),
  showErrorAlert: jasmine.createSpy()
};

const mockAppService = {
  setTitle: jasmine.createSpy()
};

const mockModalController = {
  create: jasmine.createSpy().and.resolveTo({
    present: jasmine.createSpy().and.resolveTo(),
    onDidDismiss: jasmine.createSpy().and.resolveTo({
      data: { success: true }
    })
  })
};

describe('AgendamentosPage', () => {
  let component: AgendamentosPage;
  let fixture: ComponentFixture<AgendamentosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgendamentosPage],
      providers: [
        { provide: AgendamentoService, useValue: mockAgendamentoService },
        { provide: ModalController, useValue: mockModalController },
        { provide: MensagensService, useValue: mockMensagensService },
        { provide: AppService, useValue: mockAppService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AgendamentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call appService.setTitle on init', () => {
    component.ngOnInit();
    expect(mockAppService.setTitle).toHaveBeenCalledWith('Agendamento');
  });

  it('should load agendamentos on init', async () => {
    await component.carregarAgendamentos();
    expect(mockMensagensService.showLoading).toHaveBeenCalled();
    expect(component.agendamentos.length).toBeGreaterThan(0);
    expect(component.agendamentosFiltrados.length).toBeGreaterThan(0);
  });

  it('should clear filters when limparFiltros is called', () => {
    component.dataFiltro = '2025-05-05';
    component.statusFiltro = 'agendado';
    component.limparFiltros();
    expect(component.dataFiltro).toBe('');
    expect(component.statusFiltro).toBe('todos');
  });

  it('should filter by date on onDataChange', () => {
    component.agendamentos = [
      {
        data_reserva: '2025-05-05T10:00:00.000Z', status: 'agendado',
        id: 0,
        nome_cliente: '',
        nome_servico: '',
        servico_id: 0,
        usuario_id: 0,
        data: '',
        horario: '',
        preco: 0,
        hora_reserva: '',
        imagem: ''
      }
    ];
    component.dataFiltro = '2025-05-05';
    component.onDataChange();
    expect(component.agendamentosFiltrados.length).toBe(1);
  });

  it('should filter by status', () => {
    component.agendamentos = [
      {
        data_reserva: '2025-05-05T10:00:00.000Z', status: 'finalizado',
        id: 0,
        nome_cliente: '',
        nome_servico: '',
        servico_id: 0,
        usuario_id: 0,
        data: '',
        horario: '',
        preco: 0,
        hora_reserva: '',
        imagem: ''
      },
      {
        data_reserva: '2025-05-06T10:00:00.000Z', status: 'agendado',
        id: 0,
        nome_cliente: '',
        nome_servico: '',
        servico_id: 0,
        usuario_id: 0,
        data: '',
        horario: '',
        preco: 0,
        hora_reserva: '',
        imagem: ''
      }
    ];
    component.statusFiltro = 'agendado';
    component.filtrarPorStatus();
    expect(component.agendamentosFiltrados.length).toBe(1);
    expect(component.agendamentosFiltrados[0].status).toBe('agendado');
  });

  it('should return correct color for each status', () => {
    expect(component.getStatusColor('cancelado')).toBe('secondary');
    expect(component.getStatusColor('agendado')).toBe('success');
    expect(component.getStatusColor('finalizado')).toBe('danger');
    expect(component.getStatusColor('outro')).toBe('medium');
  });

  it('should open modal and reload if success', async () => {
    spyOn(component, 'carregarAgendamentos');
    await component.abrirFormulario();
    expect(mockModalController.create).toHaveBeenCalled();
    expect(component.carregarAgendamentos).toHaveBeenCalled();
  });
});
