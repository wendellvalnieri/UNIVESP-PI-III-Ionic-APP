import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { MensagensService } from 'src/app/services/mensagens.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit {
  clienteForm: FormGroup = new FormGroup({});
  clienteId?: any;
  isNewCliente = false;
  previewImage: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private mensagensService: MensagensService
  ) { }

  ngOnInit() {
    this.clienteForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      email: ['', [Validators.email]],
      dataNascimento: [''],
      ultimoCorte: [''],
      observacoes: [''],
      fotoPerfil: ['']
    });

    this.clienteId = parseInt(this.route.snapshot.paramMap.get('id'), 10);

    if (this.clienteId) {
      this.loadCliente();
    } else {
      this.isNewCliente = true;
    }
  }

  async loadCliente() {
    const loading = await this.loadingController.create({
      message: 'Carregando informações...'
    });
    await loading.present();

    try {
      const cliente = await this.clienteService.getClienteById(this.clienteId);
      this.clienteForm.patchValue(cliente);
      loading.dismiss();
    } catch (error) {
      console.error('Erro ao carregar cliente:', error);
      loading.dismiss();
      this.mensagensService.showError('Não foi possível carregar as informações do cliente.');
    }
  }

  async saveCliente() {
    if (this.clienteForm.invalid) {
      this.mensagensService.showError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Salvando informações...'
    });
    await loading.present();

    const clienteData: Cliente = {
      ...this.clienteForm.value
    };

    if (this.clienteId) {
      clienteData.id = this.clienteId;
    }

    try {
      if (this.isNewCliente) {
        await this.clienteService.addCliente(clienteData).toPromise();
        this.mensagensService.showSuccess('Cliente cadastrado com sucesso!');
      } else {
        await this.clienteService.updateCliente(clienteData.id, clienteData).toPromise();
        this.mensagensService.showError('Informações atualizadas com sucesso!');
      }
      loading.dismiss();
      this.router.navigate(['/clientes']);
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
      loading.dismiss();
      this.mensagensService.showError('Não foi possível salvar as informações do cliente.');
    }
  }

  async takePicture() {

  }

  async deleteCliente() {
    const alert = await this.alertController.create({
      header: 'Confirmar exclusão',
      message: 'Tem certeza que deseja excluir este cliente?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          handler: async () => {
            const loading = await this.loadingController.create({
              message: 'Excluindo cliente...'
            });
            await loading.present();

            try {
              await this.clienteService.deleteCliente(this.clienteId).toPromise();
              loading.dismiss();
              this.mensagensService.showSuccess('Cliente removido com sucesso!');
              this.router.navigate(['/clientes']);
            } catch (error) {
              console.error('Erro ao excluir cliente:', error);
              loading.dismiss();
              this.mensagensService.showError('Não foi possível excluir o cliente.');
            }
          }
        }
      ]
    });

    await alert.present();
  }



  formatarData(data: string): string {
    if (!data) return '';
    return data;
  }
}