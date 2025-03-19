import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servico } from '../models/servico.model';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class ServicoService {
    constructor(private apiService: ApiService) { }

    getServicos(): Observable<Servico[]> {
        return this.apiService.get<Servico[]>('servicos');
    }

    getServicoById(id: number): Observable<Servico> {
        return this.apiService.get<Servico>(`servicos/${id}`);
    }

    addServico(servico: Servico): Observable<Servico> {
        return this.apiService.post<Servico>('servicos', servico);
    }

    updateServico(id: number, servico: Partial<Servico>): Observable<Servico> {
        return this.apiService.put<Servico>(`servicos/${id}`, servico);
    }

    deleteServico(id: number): Observable<any> {
        return this.apiService.delete<any>(`servicos/${id}`);
    }

    getServicosByCategoria(categoria: string): Observable<Servico[]> {
        return this.apiService.get<Servico[]>('servicos', { categoria });
    }
}
