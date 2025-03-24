import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { Agendamento } from '../models/agendamento.model';
import { ApiAxiosService } from './api-axios.service';

@Injectable({
    providedIn: 'root'
})
export class AgendamentoService extends CrudService<Agendamento> {
    private readonly endpoint = 'agendamentos';

    constructor(apiService: ApiAxiosService) {
        super(apiService);
    }
}
