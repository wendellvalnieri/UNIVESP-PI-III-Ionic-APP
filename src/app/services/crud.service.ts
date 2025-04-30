import { Inject, Injectable } from '@angular/core';
import { ApiAxiosService } from './api-axios.service';

@Injectable()

export class CrudService<T> {

    constructor(
        protected apiService: ApiAxiosService,
        @Inject(String) protected endpoint: string
    ) { }

    // Create a new resource
    async create(endpoint: string = this.endpoint, data: T): Promise<any> {
        return this.apiService.create(endpoint, data);
    }

    // Get all resources
    async getAll(endpoint: string = this.endpoint, params?: any): Promise<any> {
        return this.apiService.read(endpoint, params);
    }

    // Get a specific resource by ID
    async getById(endpoint: string = this.endpoint, id: number): Promise<any> {
        return this.apiService.readId(endpoint, id);
    }

    // Update an existing resource
    async update(endpoint: string = this.endpoint, id: number, data: T): Promise<any> {
        return this.apiService.update(`${endpoint}/${id}`, data);
    }

    // Delete a resource by ID
    async delete(endpoint: string = this.endpoint, id: number): Promise<any> {
        return this.apiService.delete(`${endpoint}/${id}`);
    }
}
