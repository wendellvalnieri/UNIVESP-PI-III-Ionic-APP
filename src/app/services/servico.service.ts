import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { ApiAxiosService } from './api-axios.service';
import { Servico } from '../models/servico.model';

@Injectable({
    providedIn: 'root'
})
export class ServicoService extends CrudService<Servico> {
    constructor(apiService: ApiAxiosService) {
        super(apiService, 'servicos');
    }
}
