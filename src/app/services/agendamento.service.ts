import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { ApiAxiosService } from './api-axios.service';
import { Agendamento } from '../models/agendamento.model';

@Injectable({
    providedIn: 'root'
})

export class AgendamentoService extends CrudService<Agendamento> {
    private readonly endpoint = 'reservas';

    constructor(apiService: ApiAxiosService) {
        super(apiService);
    }

    async getTodosAgendamentos(data: Date): Promise<any> {
        const response = await this.getAll(this.endpoint, { data: data.toISOString() });
        return response;
    }
}
