import { Injectable } from '@angular/core';
import { ApiAxiosService } from './api-axios.service';
import { ResponseAPI } from '../models/responseAPI.model';

@Injectable({
    providedIn: 'root'
})
export abstract class CrudService<T> {
    protected abstract get endpoint(): string;

    constructor(protected apiService: ApiAxiosService) { }

    // Create a new resource
    async create(endpoint: string, data: T): Promise<any> {
        return this.apiService.create(endpoint, data);
    }

    // Get all resources

    async getAll(customEndpoint?: string, params?: any): Promise<any> {
        const endpoint = customEndpoint || this.endpoint;
        return this.apiService.read(endpoint, params);
    }

    // Get a specific resource by ID
    async getById(endpoint: string, id: number): Promise<ResponseAPI> {
        return this.apiService.readId(endpoint, id);
    }

    // Update an existing resource
    async update(endpoint: string, id: number, data: T): Promise<any> {
        return this.apiService.update(`${endpoint}/${id}`, data);
    }

    // Delete a resource by ID
    async delete(endpoint: string, id: number): Promise<any> {
        return this.apiService.delete(`${endpoint}/${id}`);
    }
}
