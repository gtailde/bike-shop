import { CustomersAPI } from './CustomersAPI';
import type { ICustomer, IErrorResponse, IAddressData } from 'types/types';
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

      const body = {
        version: customerData.version,
        actions: [
          {
            action,
            [changeType]: newUserData,
          },
        ],
      };

      const response = await axios.post(url, JSON.stringify(body), { headers: tokenHeaders });
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

  public async changePassword(
    currentPassword: string,
    newPassword: string,
  ): Promise<ICustomer | IErrorResponse> {
    try {
      const customerData = await this.getCustomer();
      if (!('id' in customerData)) throw new Error('error get customer data');
      const url = `${this.apiUrl}/${this.projectKey}/customers/password`;
      const token = this.getToken('access_token');
      const tokenHeaders = this.getTokenHeaders(token.access_token);
      const body = {
        id: customerData.id,
        version: customerData.version,
        currentPassword,
        newPassword,
      };

      const response = await axios.post(url, body, { headers: tokenHeaders });
      await this.loginCustomer(customerData.email, newPassword);
      return response.data;
    } catch (error) {
      return this.handleError(error, 'Failed to change user data');
    }
  }

  private async modifyAddress(
    action: 'addAddress' | 'changeAddress',
    addressData: IAddressData,
    addressId?: string,
  ): Promise<string | ICustomer> {
    try {
      const customerData = await this.getCustomer();
      if (!('id' in customerData)) throw new Error('error get customer data');
      const url = `${this.apiUrl}/${this.projectKey}/customers/${customerData.id}`;
      const token = this.getToken('access_token');
      const tokenHeaders = this.getTokenHeaders(token.access_token);

      const addressAction = {
        action,
        address: addressData,
        addressId: undefined as string | undefined,
      };

      if (action === 'changeAddress') addressAction.addressId = addressId;

      const body = {
        version: customerData.version,
        actions: [addressAction],
      };

      const response = await axios.post(url, body, { headers: tokenHeaders });
      const responseData: ICustomer = response.data;

      if (action === 'addAddress') {
        const lastAddress = responseData.addresses.slice(-1)[0];
        return lastAddress?.id || '';
      }
      return responseData;
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      throw new Error(`Failed to ${action} customer address`);
    }
  }

  public async addAddress(addressData: IAddressData): Promise<string> {
    return (await this.modifyAddress('addAddress', addressData)) as string;
  }

  public async changeAddress(addressData: IAddressData, addressId: string) {
    return await this.modifyAddress('changeAddress', addressData, addressId);
  }

  public async addAddressId(
    type: 'addBillingAddressId' | 'addShippingAddressId',
    addressData: IAddressData | '',
    addressId?: string,
  ) {
    if (addressId) return await this.updateCustomers(type, 'addressId', addressId);
    if (addressData) {
      const getAddressId = await this.addAddress(addressData);
      return await this.updateCustomers(type, 'addressId', getAddressId);
    }
  }

  public async removeAddressId(
    addressId: string,
    type: 'removeBillingAddressId' | 'removeShippingAddressId',
  ) {
    return await this.updateCustomers(type, 'addressId', addressId);
  }

  public async removeAddress(addressId: string) {
    return await this.updateCustomers('removeAddress', 'addressId', addressId);
  }
}

const updateCustomersAPI = new UpdateCustomerAPI();
export default updateCustomersAPI;
