import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { MensagensService } from './mensagens.service';
@Injectable({
  providedIn: 'root'
})
export class ApiAxiosService {
  private request = axios.create({
    baseURL: environment.apiUrl,
    timeout: 0,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });

  constructor(
    private storage: Storage,
    private router: Router,
    private mensagensService: MensagensService,
  ) {

    this.request.interceptors.request.use(async (request: any) => {
      const existToken = await this.isTokenSetted();
      if (existToken.isSetted) {
        request.headers["Authorization"] = `Bearer ${existToken.token}`;
      }

      return request;
    }, (error: any) => {
      if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error.message);
    });

    this.request.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (error.response && (error.response.status === 401 ||
          (error.response.data && error.response.data.message === 'token_expirado'))) {

          await this.storage.remove('token');
          this.mensagensService.showErrorAlert(error.response.message);
          this.router.navigate(['/login']);
          return Promise.reject({ error: error });
        }
        return Promise.reject(error);
      }
    );
  }

  async readId(url: String, id: Number) {
    try {
      const response = await this.request.get(`${url}/${id}`);
      return await (response.data.data);
    } catch (error: any) {
      const errorMessage = this.formatErrorMessage(error);
      return errorMessage;
    }
  }

  async read(url: string, params: any = {}) {
    try {
      const response = await this.request.get(url, {
        params: params
      });
      return await (response.data);
    } catch (error: any) {
      const errorMessage = this.formatErrorMessage(error);
      return errorMessage;
    }
  }

  async create(url: string, data: any) {
    try {
      const response = await this.request.post(url, data);
      return await (response.data);
    } catch (error: any) {
      const errorMessage = this.formatErrorMessage(error);
      return errorMessage;
    }
  }

  async update(url: string, data: any) {
    try {
      const response = await this.request.patch(url, data);
      return await (response.data);
    } catch (error: any) {
      return this.formatErrorMessage(error);
    }
  }

  async post(url: string, data: any = []) {
    try {
      const response = await this.request.post(url, data);
      return await (response.data);
    } catch (error: any) {
      const errorMessage = this.formatErrorMessage(error);
      return errorMessage;
    }
  }
  async delete(url: string) {
    try {
      const response = await this.request.delete(url);
      return await (response.data);
    } catch (error: any) {
      const errorMessage = this.formatErrorMessage(error);
      return errorMessage;
    }
  }
  async upload(url: string, data: any = []) {
    try {
      const response = await axios.post(`${environment.apiUrl}${url}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${localStorage['token']}`
        },
      });
      return await (response.data);
    } catch (error: any) {
      return this.formatErrorMessage(error);
    }
  }

  async isTokenSetted() {
    const token = await this.storage.get('token');
    if (token) {
      return {
        isSetted: true,
        token: token,
      };
    }
    return {
      isSetted: false,
      token: '',
    };
  }

  formatErrorMessage(error: any) {
    if (error?.response?.data?.error) return error?.response?.data;
    if (error.message) {
      if (error?.response) {
        return error.response.data;
      }
      return error.message;
    }
    return error.response.data;
  }
}