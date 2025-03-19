import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Agendamento } from '../models/agendamento.model';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class AgendamentoService {
    constructor(private apiService: ApiService) { }

    getAgendamentos(): Observable<Agendamento[]> {
        return this.apiService.get<Agendamento[]>('agendamentos');
    }

    getAgendamentosDoCliente(clienteId: number): Observable<Agendamento[]> {
        return this.apiService.get<Agendamento[]>('agendamentos', { clienteId });
    }

    getAgendamentosPorDia(data: Date): Observable<Agendamento[]> {
        const dataFormatada = data.toISOString().split('T')[0];
        return this.apiService.get<Agendamento[]>('agendamentos', { data: dataFormatada });
    }

    getAgendamentoById(id: number): Observable<Agendamento> {
        return this.apiService.get<Agendamento>(`agendamentos/${id}`);
    }

    addAgendamento(agendamento: Agendamento): Observable<Agendamento> {
        return this.apiService.post<Agendamento>('agendamentos', agendamento);
    }

    updateAgendamento(id: number, agendamento: Partial<Agendamento>): Observable<Agendamento> {
        return this.apiService.put<Agendamento>(`agendamentos/${id}`, agendamento);
    }

    cancelarAgendamento(id: number): Observable<any> {
        return this.apiService.put<any>(`agendamentos/${id}/cancelar`, {});
    }

    concluirAgendamento(id: number): Observable<any> {
        return this.apiService.put<any>(`agendamentos/${id}/concluir`, {});
    }

    verificarDisponibilidade(data: string, horario: string): Observable<boolean> {
        return this.apiService.get<boolean>('agendamentos/disponibilidade', { data, horario });
    }
}
