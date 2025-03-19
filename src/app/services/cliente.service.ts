import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Cliente } from '../models/cliente.model';

@Injectable({
    providedIn: 'root'
})
export class ClienteService {
    constructor(private apiService: ApiService) { }

    getClientes(): Observable<Cliente[]> {
        return this.apiService.get<Cliente[]>('clientes');
    }

    getClienteById(id: number): Observable<Cliente> {
        return this.apiService.get<Cliente>(`clientes/${id}`);
    }

    addCliente(cliente: Cliente): Observable<Cliente> {
        return this.apiService.post<Cliente>('clientes', cliente);
    }

    updateCliente(id: number, cliente: Partial<Cliente>): Observable<Cliente> {
        return this.apiService.put<Cliente>(`clientes/${id}`, cliente);
    }

    deleteCliente(id: number): Observable<any> {
        return this.apiService.delete<any>(`clientes/${id}`);
    }

    searchClientes(term: string): Observable<Cliente[]> {
        return this.apiService.get<Cliente[]>('clientes', { search: term });
    }
}