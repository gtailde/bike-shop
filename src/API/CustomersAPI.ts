import CommercetoolsAPI from './CommercetoolsAPI';
import axios, { isAxiosError } from 'axios';
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import type { ICustomer, IErrorResponse } from '../types/types';

class CustomersAPI extends CommercetoolsAPI {
  public async registerCustomer(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
  ): Promise<ICustomer | IErrorResponse> {
    try {
      const url = `${this.apiUrl}/${this.projectKey}/in-store/key=${this.storeKey}/me/signup`;
      const getToken = localStorage.getItem('anonym_token');
      if (!getToken) throw new Error('Token error');

      const token: IAccessToken = JSON.parse(getToken);
      const headers = this.getTokenHeaders(token.access_token);
      const body = { email, firstName, lastName, password };

      const response: AxiosResponse = await axios.post(url, body, { headers });
      const responseData = response.data.customer;
      const loginData = await this.loginCustomer(email, password);

      if (!('access_token' in loginData)) throw new Error('Failed to login');
      return responseData;
    } catch (error) {
      if (isAxiosError(error)) return this.handleAxiosError(error);
      console.error('An unexpected error occurred:', error);
      throw new Error('Failed to register customer');
    }
  }

  public async loginCustomer(email: string, password: string): Promise<ICustomer | IErrorResponse> {
    try {
      const url = `${this.authUrl}/oauth/${this.projectKey}/in-store/key=${this.storeKey}/customers/token`;
      const scope = 'manage_project:82mcjsovqo manage_api_clients:82mcjsovqo';

      const body = new URLSearchParams();
      body.append('grant_type', 'password');
      body.append('username', email);
      body.append('password', password);
      body.append('scope', scope);

      const headers = this.getAuthHeaders();

      const response = await axios.post(url, body, { headers });
      const responseData: IAccessToken = response.data;
      if (!responseData) throw new Error('Login error');

      const getAnonymToken = localStorage.getItem('anonym_token');
      if (getAnonymToken) {
        const token: IAccessToken = JSON.parse(getAnonymToken);
        await this.revokeToken(token.access_token, 'access_token');
        if (token.refresh_token) await this.revokeToken(token.refresh_token, 'refresh_token');
      }
      localStorage.removeItem('anonym_token');
      localStorage.setItem('access_token', JSON.stringify(responseData));

      const customer = await this.getCustomer(responseData.access_token);
      return customer;
    } catch (error) {
      if (isAxiosError(error)) return this.handleAxiosError(error);
      console.error('An unexpected error occurred:', error);
      throw new Error('Failed to log in customer');
    }
  }

  public async getCustomer(token: string): Promise<ICustomer | IErrorResponse> {
    const url = `${this.apiUrl}/${this.projectKey}/in-store/key=${this.storeKey}/me`;
    const tokenHeaders = this.getTokenHeaders(token);
    try {
      const response = await axios.get(url, { headers: tokenHeaders });
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) return this.handleAxiosError(error);
      console.error('An unexpected error occurred:', error);
      throw new Error('Failed to get customer');
    }
  }
}
const customersApi = new CustomersAPI();

export default customersApi;
