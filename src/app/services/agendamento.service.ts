import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { ApiAxiosService } from './api-axios.service';
import { Agendamento } from '../models/agendamento.model';
import { AlertController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})

export class AgendamentoService extends CrudService<Agendamento> {
    constructor(apiService: ApiAxiosService, private alertController: AlertController) {
        super(apiService, 'reservas');
    }

    async getAgendamentosByUser(date: Date): Promise<any> {
        const response = await this.getAll(`${this.endpoint}/byUser`, { date: date.toISOString() });
        return response;
    }

    async getAgendamento(id: number): Promise<any> {
        const response = await this.getById(this.endpoint, id);
        return response;
    }
    verificarDisponibilidade(dataHora: Date, agendamentoIdAtual: string | null) {
        return;
    }

    agendar(data: any): Promise<any> {
        const response = this.create(this.endpoint, data);
        return response;
    }

    async showConfirmarCancelamento(agendamento: Agendamento): Promise<any> {
        const alert = await this.alertController.create({
            header: 'Confirmar cancelamento',
            message: `Deseja realmente cancelar este agendamento de ${agendamento.nome_servico}?`,
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: () => {
                        return false;
                    }
                },
                {
                    text: 'Confirmar',
                    handler: () => {
                        return true;
                    }
                }
            ]
        });
        await alert.present();
        const result = await alert.onDidDismiss();
        return result.role !== 'cancel';
    }

    async cancelarAgendamento(id: number): Promise<any> {
        const response = await this.delete(`${this.endpoint}/cancelar`, id);
        return response;
    }

}
