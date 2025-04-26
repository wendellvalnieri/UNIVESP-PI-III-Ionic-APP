// src/app/services/agendamento.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Agendamento } from '../models/agendamento.model';
import { CrudService } from './crud.service';
import { ApiAxiosService } from './api-axios.service';

@Injectable({
    providedIn: 'root'
})
export class AgendamentoService extends CrudService<Agendamento> {
    protected get endpoint(): string {
        return 'reservas';
    }
    // Para simulação, vamos usar um array local
    private agendamentos: any[] = [];

    constructor(apiService: ApiAxiosService) {
        super(apiService);
    }

    async getAgendamentos(): Promise<any> {
        const response = await this.getAll(`${this.endpoint}/byUser`);
        return response;
    }

    async getAgendamento(id: number): Promise<any> {
        const response = await this.getById(this.endpoint, id);
        return response;
    }

    async criarAgendamento(agendamento: any): Promise<any> {
        return this.create(this.endpoint, agendamento);
    }

    atualizarAgendamento(id: number, agendamento: any): Promise<any> {
        return this.update(this.endpoint, id, agendamento);
    }

    verificarDisponibilidade(dataHora: Date, agendamentoIdAtual: string | null) {
        return;
    }
    async getAgendamentosByUser(date: Date): Promise<any> {
        const response = await this.getAll(`${this.endpoint}/byUser`, { date: date.toISOString() });
        return response;
    }
}