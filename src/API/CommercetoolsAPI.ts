import axios from 'axios';
import { Buffer } from 'buffer';

class CommercetoolsAPI {
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly authUrl: string;
  public projectKey: string;
  public apiUrl: string;

  constructor() {
    this.clientId = '3ljXP8YjRgV-DMfceZhEJJML';
    this.clientSecret = '2E8pMbfsOizJs8MqWz8Kssj8AuOMWOOa';
    this.authUrl = 'https://auth.europe-west1.gcp.commercetools.com/oauth/token';
    this.projectKey = '82mcjsovqo';
    this.apiUrl = 'https://api.europe-west1.gcp.commercetools.com';
  }

  private getBase64EncodedCredentials(): string {
    const credentials = `${this.clientId}:${this.clientSecret}`;
    const encodedCredentials = Buffer.from(credentials).toString('base64');
    return encodedCredentials;
  }

  public async getAccessToken(): Promise<string> {
    try {
      const authHeaders = {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${this.getBase64EncodedCredentials()}`,
      };

      const authData = new URLSearchParams({
        grant_type: 'client_credentials',
      });

      const tokenResponse = await axios.post(this.authUrl, authData.toString(), {
        headers: authHeaders,
      });

      const accessToken = tokenResponse.data.access_token;
      return accessToken;
    } catch (error) {
      console.error('Error fetching access token:', error);
      throw error;
    }
  }
}

export default CommercetoolsAPI;
