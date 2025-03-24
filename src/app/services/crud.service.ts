import { Injectable } from '@angular/core';
import { ApiAxiosService } from './api-axios.service';

@Injectable({
    providedIn: 'root'
})
export class CrudService<T> {
    constructor(private apiService: ApiAxiosService) { }

    // Create a new resource
    async createResource(endpoint: string, data: T): Promise<any> {
        return this.apiService.create(endpoint, data);
    }

    // Get all resources
    async getAllResources(endpoint: string, params?: any): Promise<T[]> {
        return this.apiService.read(endpoint, params);
    }

    // Get a specific resource by ID
    async getResourceById(endpoint: string, id: number): Promise<T> {
        return this.apiService.readId(endpoint, id);
    }

    // Update an existing resource
    async updateResource(endpoint: string, id: number, data: T): Promise<any> {
        return this.apiService.update(`${endpoint}/${id}`, data);
    }

    // Delete a resource by ID
    async deleteResource(endpoint: string, id: number): Promise<any> {
        return this.apiService.delete(`${endpoint}/${id}`);
    }
}
