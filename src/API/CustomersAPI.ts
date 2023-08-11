import CommercetoolsAPI from "./CommercetoolsAPI";

class CustomersAPI extends CommercetoolsAPI {
  public async registerCustomer(
    email: string,
    firstName: string,
    lastName: string,
    password: string
  ): Promise<any> {
    try {
      const url = `${this.authUrl}/${this.projectKey}/customers`;
      const accessToken = await this.getAccessToken();

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      };

      const body = JSON.stringify({ email, firstName, lastName, password });

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body,
      });

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error registering:', error);
      throw error;
    }
  }

  public async login(
    email: string,
    password: string
  ): Promise<any> {
    try {
      const url = `${this.authUrl}/${this.projectKey}/login`;
      const accessToken = await this.getAccessToken();

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      };

      const body = JSON.stringify({
        email,
        password,
      });

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body,
      });

      return response.json();
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  }
}

const customersApi = new CustomersAPI();

export default customersApi;
