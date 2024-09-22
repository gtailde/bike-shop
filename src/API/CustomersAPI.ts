import { CommercetoolsAPI } from './CommercetoolsAPI';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { ICustomer, IErrorResponse, IAccessToken } from '../types/types';
import { successNotify, errorNotify } from '../Notifiers';

class CustomersAPI extends CommercetoolsAPI {
  public async registerCustomer(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
  ): Promise<ICustomer | IErrorResponse> {
    try {
      const url = `${this.apiUrl}/${this.projectKey}/in-store/key=${this.storeKey}/me/signup`;
      const token = this.getToken('anonym_token');

      const headers = this.getTokenHeaders(token.access_token);
      const body = { email, firstName, lastName, password };

      const response: AxiosResponse = await axios.post(url, body, { headers });
      const responseData: ICustomer = response.data.customer;
      const loginData = await this.loginCustomer(email, password);

      if (!('id' in loginData)) errorNotify(loginData.message);

      successNotify(`You have successfully registered as ${responseData.firstName}!`);
      return responseData;
    } catch (error) {
      const errorResponse = this.handleError(error, 'Failed to register user');
      errorNotify(errorResponse.message);
      return errorResponse;
    }
  }

  public async loginCustomer(email: string, password: string): Promise<ICustomer | IErrorResponse> {
    try {
      const url = `${this.authUrl}/oauth/${this.projectKey}/in-store/key=${this.storeKey}/customers/token`;
      const scope = `manage_project:${this.projectKey} manage_api_clients:${this.projectKey}`;

      const body = new URLSearchParams();
      body.append('grant_type', 'password');
      body.append('username', email);
      body.append('password', password);
      body.append('scope', scope);

      const headers = this.getAuthHeaders();

      const response = await axios.post(url, body, { headers });
      const responseData: IAccessToken = response.data;
      if (!responseData) errorNotify('Login error');
      const getAnonymToken = localStorage.getItem('anonym_token');
      if (getAnonymToken) await this.logoutCustomer('anonym_token');
      localStorage.setItem('access_token', JSON.stringify(responseData));
      const customer = await this.getCustomer();

      successNotify('You have successfully logged in!');
      return customer;
    } catch (error) {
      const errorResponse = this.handleError(error, 'Failed to login user');
      errorNotify(errorResponse.message);
      return errorResponse;
    }
  }

  public async getCustomer(): Promise<ICustomer | IErrorResponse> {
    try {
      const url = `${this.apiUrl}/${this.projectKey}/in-store/key=${this.storeKey}/me`;
      const token = this.getToken('access_token');
      const tokenHeaders = this.getTokenHeaders(token.access_token);
      const response = await axios.get(url, { headers: tokenHeaders });
      return response.data;
    } catch (error) {
      const errorResponse = this.handleError(error, 'Failed to get user data');
      errorNotify(errorResponse.message);
      return errorResponse;
    }
  }

  public async logoutCustomer(tokenType: 'anonym_token' | 'access_token'): Promise<void> {
    try {
      const token = this.getToken(tokenType);
      await this.revokeToken(token.access_token, 'access_token');
      if (token.refresh_token) await this.revokeToken(token.refresh_token, 'refresh_token');
      localStorage.removeItem(tokenType);

      if (tokenType === 'access_token') {
        const getAnonymToken = await this.getAnonymousToken();
        if (!('access_token' in getAnonymToken)) errorNotify(getAnonymToken.message);
        localStorage.setItem('anonym_token', JSON.stringify(getAnonymToken));
        successNotify('You have successfully logged out!');
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      errorNotify('Failed to logout customer');
    }
  }
}
const customersApi = new CustomersAPI();

export { customersApi, CustomersAPI };
