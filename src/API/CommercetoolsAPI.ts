import type { IErrorResponse } from '../types/types';

class CommercetoolsAPI {
  protected readonly clientId: string;
  protected readonly clientSecret: string;
  protected readonly authUrl: string;
  protected readonly projectKey: string;
  protected readonly apiUrl: string;
  protected readonly storeKey: string;

  constructor() {
    this.clientId = '3ljXP8YjRgV-DMfceZhEJJML';
    this.clientSecret = '2E8pMbfsOizJs8MqWz8Kssj8AuOMWOOa';
    this.authUrl = 'https://auth.europe-west1.gcp.commercetools.com';
    this.projectKey = '82mcjsovqo';
    this.apiUrl = 'https://api.europe-west1.gcp.commercetools.com';
    this.storeKey = 'RSS-Bikes';
  }

  protected getBase64EncodedCredentials(): string {
    const credentials = `${this.clientId}:${this.clientSecret}`;
    const encodedCredentials = btoa(credentials);
    return encodedCredentials;
  }

  protected handleAxiosError(axiosError: AxiosError<IErrorResponse>): IErrorResponse {
    const errorData = axiosError.response?.data;
    if (errorData) return errorData;
    console.error('An error occurred:', axiosError);
    throw axiosError;
  }

  protected authHeaders = {
    'Content-Type': 'application/json',
  };

  protected getTokenHeaders(token: string) {
    return {
      ...this.authHeaders,
      Authorization: `Bearer ${token}`,
    };
  }

  protected getAuthHeaders() {
    return {
      Authorization: `Basic ${this.getBase64EncodedCredentials()}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
  }

  protected async getAnonymousToken(): Promise<IAccessToken | IErrorResponse> {
    try {
      const authHeaders = this.getAuthHeaders();

      const authData = new URLSearchParams({
        grant_type: 'client_credentials',
      });

      const response = await axios.post(
        `${this.authUrl}/oauth/${this.projectKey}/anonymous/token`,
        authData.toString(),
        { headers: authHeaders },
      );

      const responseData = response.data;
      localStorage.setItem('anonym_token', JSON.stringify(responseData));

      return responseData;
    } catch (error) {
      if (isAxiosError(error)) return this.handleAxiosError(error);
      console.error('Error fetching access token:', error);
      throw new Error('Failed to fetch access token');
    }
  }

  protected async checkAccessToken(token: string): Promise<ITokenData | IErrorResponse> {
    try {
      const url = `${this.authUrl}/oauth/introspect`;
      const authHeaders = this.getAuthHeaders();

      const authData = new URLSearchParams({
        token: token,
      });

      const response = await axios.post(url, authData.toString(), {
        headers: authHeaders,
      });

      return response.data;
    } catch (error) {
      if (isAxiosError(error)) return this.handleAxiosError(error);
      console.error('Error checking access token:', error);
      throw new Error('Failed to check access token');
    }
  }

  protected async refreshToken(refreshToken: string): Promise<IAccessToken | IErrorResponse> {
    try {
      const tokenEndpoint = `${this.authUrl}/oauth/token`;

      const response = await axios.post(
        tokenEndpoint,
        'grant_type=refresh_token&refresh_token=' + encodeURIComponent(refreshToken),
        {
          headers: this.getTokenHeaders(refreshToken),
        },
      );

      return response.data;
    } catch (error) {
      if (isAxiosError(error)) return this.handleAxiosError(error);
      console.error('Error refreshing token:', error);
      throw new Error('Failed to refresh access token');
    }
  }

  protected async revokeToken(
    token: string,
    tokenTypeHint: 'access_token' | 'refresh_token',
  ): Promise<IErrorResponse | void> {
    try {
      const url = `${this.authUrl}/oauth/token/revoke`;
      const headers = this.getAuthHeaders();

      const data = new URLSearchParams({
        token: token,
        token_type_hint: tokenTypeHint,
      });

      await axios.post(url, data.toString(), { headers });
    } catch (error) {
      if (isAxiosError(error)) return this.handleAxiosError(error);
      console.error('Error revoking token:', error);
      throw new Error('Failed to revoke token');
    }
  }

  public async startAPI(): Promise<void> {
    try {
      const accessToken = localStorage.getItem('access_token');
      const anonymToken = localStorage.getItem('anonym_token');

      if (accessToken) {
        const token: IAccessToken = JSON.parse(accessToken);
        const isAccessTokenValid = await this.refreshToken(token.access_token);

        if (isAccessTokenValid) {
          localStorage.removeItem('anonym_token');
          return;
        }

        if (token.refresh_token) {
          const refreshToken = await this.refreshToken(token.refresh_token);
          if ('access_token' in refreshToken) {
            localStorage.removeItem('anonym_token');
            return;
          }
        }

        localStorage.removeItem('access_token');
      }

      if (anonymToken) {
        const token: IAccessToken = JSON.parse(anonymToken);
        const isAccessTokenValid = await this.checkAccessToken(token.access_token);

        if (isAccessTokenValid) return;

        if (token.refresh_token) {
          const refreshToken = await this.refreshToken(token.refresh_token);
          if ('access_token' in refreshToken) return;
        }
      }

      const newAnonymToken = await this.getAnonymousToken();
      localStorage.setItem('anonym_token', JSON.stringify(newAnonymToken));
      return;
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      throw new Error('Failed to start');
    }
  }
}

export default CommercetoolsAPI;
