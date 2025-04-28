import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { ApiAxiosService } from './api-axios.service';
import { Agendamento } from '../models/agendamento.model';

@Injectable({
    providedIn: 'root'
})

export class AgendamentoService extends CrudService<Agendamento> {
    constructor(apiService: ApiAxiosService) {
        super(apiService,'reservas');
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
}
