import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { ApiAxiosService } from './api-axios.service';
import { Cliente } from '../models/cliente.model';

@Injectable({
    providedIn: 'root'
})
export class ClienteService extends CrudService<Cliente> {
    private readonly endpoint = 'clients';

    constructor(apiService: ApiAxiosService) {
        super(apiService);
    }
}
