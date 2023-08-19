import CommercetoolsAPI from './CommercetoolsAPI';
import axios, { isAxiosError } from 'axios';
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import type { ICustomer, IErrorResponse } from '../types/types';

class CustomersAPI extends CommercetoolsAPI {
  private async getRequestHeaders(): Promise<AxiosRequestConfig['headers']> {
    const accessToken = await this.getAccessToken();
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };
  }

  private handleAxiosError(axiosError: AxiosError<IErrorResponse>): IErrorResponse {
    const errorData = axiosError.response?.data;
    if (errorData) {
      return errorData;
    }
    console.error('An error occurred:', axiosError);
    throw axiosError;
  }

  public async registerCustomer(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
  ): Promise<ICustomer | IErrorResponse> {
    try {
      const url = `${this.apiUrl}/${this.projectKey}/customers`;
      const headers = await this.getRequestHeaders();
      const body = {
        email,
        firstName,
        lastName,
        password,
      };
      const response: AxiosResponse = await axios.post(url, body, { headers });
      const responseData = response.data;
      return responseData.customer;
    } catch (error) {
      if (isAxiosError(error)) {
        return this.handleAxiosError(error);
      } else {
        console.error('An unexpected error occurred:', error);
        throw error;
      }
    }
  }

  public async loginCustomer(email: string, password: string): Promise<ICustomer | IErrorResponse> {
    try {
      const url = `${this.apiUrl}/${this.projectKey}/login`;
      const headers = await this.getRequestHeaders();
      const body = {
        email,
        password,
      };
      const response: AxiosResponse = await axios.post(url, body, { headers });
      const responseData = response.data;
      return responseData.customer;
    } catch (error) {
      if (isAxiosError(error)) {
        return this.handleAxiosError(error);
      } else {
        console.error('An unexpected error occurred:', error);
        throw error;
      }
    }
  }
}

const customersApi = new CustomersAPI();

export default customersApi;
