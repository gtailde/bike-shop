import { CustomersAPI } from './CustomersAPI';
import type { ICustomer, IErrorResponse } from 'types/types';
import axios from 'axios';

class UpdateCustomerAPI extends CustomersAPI {
  private async updateCustomers(
    action: string,
    changeType: string,
    newUserData: string,
  ): Promise<ICustomer | IErrorResponse> {
    try {
      const customerData = await this.getCustomer();
      if (!('id' in customerData)) throw new Error('error get customer data');
      const url = `${this.apiUrl}/${this.projectKey}/customers/${customerData.id}`;
      const token = this.getToken('access_token');
      const tokenHeaders = this.getTokenHeaders(token.access_token);

      const actionObject: Record<string, any> = {};
      actionObject[action] = { [changeType]: newUserData };

      const body = {
        version: customerData.version,
        actions: [actionObject],
      };

      const response = await axios.post(url, body, { headers: tokenHeaders });
      return response.data;
    } catch (error) {
      return this.handleError(error, 'Failed to change user data');
    }
  }

  public async setEmail(newEmail: string) {
    return await this.updateCustomers('changeEmail', 'email', newEmail);
  }

  public async setFirstName(newFirstName: string) {
    return await this.updateCustomers('setFirstName', 'firstName', newFirstName);
  }

  public async setLastName(newLastName: string) {
    return await this.updateCustomers('setLastName', 'lastName', newLastName);
  }

  public async setDateOfBirth(dateOfBirth: string) {
    return await this.updateCustomers('setDateOfBirth', 'dateOfBirth', dateOfBirth);
  }
}

const updateCustomersAPI = new UpdateCustomerAPI();
export default updateCustomersAPI;
