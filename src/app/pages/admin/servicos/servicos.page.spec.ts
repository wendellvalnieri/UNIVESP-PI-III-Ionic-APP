import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServicosPage } from './servicos.page';
import { AppService } from 'src/app/services/app.service';
import { MensagensService } from 'src/app/services/mensagens.service';
import { ServicoService } from 'src/app/services/servico.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Servico } from './servico.interface';

const mockAppService = {
  setTitle: jasmine.createSpy()
};

const mockMensagensService = {
  showLoading: jasmine.createSpy().and.resolveTo(),
  hideLoading: jasmine.createSpy(),
  showError: jasmine.createSpy()
};

const mockServicoService = {
  getAll: jasmine.createSpy().and.resolveTo({
    success: true,
    data: [
      { id: '1', nome: 'Corte de Cabelo', descricao: 'Corte masculino', preco: '30.00' },
      { id: '2', nome: 'Manicure', descricao: 'Serviço completo', preco: '0' }
    ] as Servico[]
  })
};

const mockModalController = {
  create: jasmine.createSpy().and.resolveTo({
    present: jasmine.createSpy().and.resolveTo(),
    onDidDismiss: jasmine.createSpy().and.resolveTo({ data: null })
  })
};

const mockRouter = {
  navigate: jasmine.createSpy()
};

describe('ServicosPage', () => {
  let component: ServicosPage;
  let fixture: ComponentFixture<ServicosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServicosPage],
      providers: [
        { provide: AppService, useValue: mockAppService },
        { provide: MensagensService, useValue: mockMensagensService },
        { provide: ServicoService, useValue: mockServicoService },
        { provide: ModalController, useValue: mockModalController },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ServicosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set title and load services on init', async () => {
    const carregarSpy = spyOn(component, 'carregarServicos').and.callThrough();
    component.ngOnInit();
    expect(mockAppService.setTitle).toHaveBeenCalledWith('Serviços');
    expect(carregarSpy).toHaveBeenCalled();
  });

  it('should load services successfully', async () => {
    await component.carregarServicos();
    expect(mockMensagensService.showLoading).toHaveBeenCalled();
    expect(component.servicos.length).toBe(2);
    expect(component.carregando).toBeFalse();
  });

  it('should show error if service call fails', async () => {
    mockServicoService.getAll.and.resolveTo({ success: false, message: 'Erro ao carregar' });
    await component.carregarServicos();
    expect(mockMensagensService.showError).toHaveBeenCalledWith('Erro ao carregar');
  });

  it('should open service detail modal', async () => {
    const servico: Servico = {
      id: '1', nome: 'Corte', descricao: '', preco: '20',
      imagem: null,
      slug: '',
      criado: '',
      modificado: '',
      ativo: false
    };
    await component.abrirDetalhesServico(servico);
    expect(mockModalController.create).toHaveBeenCalled();
  });

  it('should filter services by search term', () => {
    component.servicos = [
      {
        id: '1', nome: 'Corte de Cabelo', descricao: 'Corte masculino', preco: '30.00',
        imagem: null,
        slug: '',
        criado: '',
        modificado: '',
        ativo: false
      },
      {
        id: '2', nome: 'Manicure', descricao: 'Serviço completo', preco: '50.00',
        imagem: null,
        slug: '',
        criado: '',
        modificado: '',
        ativo: false
      }
    ];
    component.searchTerm = 'cabelo';
    component.filtrarServico();
    expect(component.servicosFiltrados.length).toBe(1);
    expect(component.servicosFiltrados[0].nome).toContain('Corte');
  });

  it('should reset filter if search term is empty', () => {
    component.servicos = [
      {
        id: '1', nome: 'A', descricao: '', preco: '10',
        imagem: null,
        slug: '',
        criado: '',
        modificado: '',
        ativo: false
      },
      {
        id: '2', nome: 'B', descricao: '', preco: '20',
        imagem: null,
        slug: '',
        criado: '',
        modificado: '',
        ativo: false
      }
    ];
    component.searchTerm = '';
    component.filtrarServico();
    expect(component.servicosFiltrados.length).toBe(2);
  });

  it('should format price correctly', () => {
    expect(component.formatarPreco('0')).toBe('Consulte');
    expect(component.formatarPreco('25')).toBe('R$ 25,00');
  });

  it('should open agendamento modal and stop propagation', async () => {
    const event = new MouseEvent('click');
    spyOn(event, 'stopPropagation');
    await component.goToAgendamento(event, '1');
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(mockModalController.create).toHaveBeenCalled();
  });

  it('should return default image path', () => {
    expect(component.getDefaultImage()).toBe('assets/images/default-service.png');
  });
});
