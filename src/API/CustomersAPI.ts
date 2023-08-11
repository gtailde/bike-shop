import CommercetoolsAPI from './CommercetoolsAPI';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ICustomer, IErrors } from '../types/types';

class CustomersAPI extends CommercetoolsAPI {
  public async registerCustomer(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
  ): Promise<ICustomer | IErrors> {
    try {
      const url = `${this.apiUrl}/${this.projectKey}/customers`;
      const accessToken = await this.getAccessToken();

      const headers: AxiosRequestConfig['headers'] = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      };

      const body = {
        email,
        firstName,
        lastName,
        password,
      };

      const response: AxiosResponse = await axios.post(url, body, {
        headers,
      });

      return response.data;
    } catch (error) {
      console.error('Error registering:', error);
      throw error;
    }
  }

  public async loginCustomer(email: string, password: string): Promise<ICustomer | IErrors> {
    try {
      const url = `${this.apiUrl}/${this.projectKey}/login`;
      const accessToken = await this.getAccessToken();

      const headers: AxiosRequestConfig['headers'] = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      };

      const body = {
        email,
        password,
      };

      const response: AxiosResponse = await axios.post(url, body, {
        headers,
      });

      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  }
}

const customersApi = new CustomersAPI();

export default customersApi;
