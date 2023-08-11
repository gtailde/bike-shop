class CommercetoolsAPI {
  private readonly clientId: string;
  private readonly clientSecret: string;
  public authUrl: string;
  public projectKey: string;

  constructor() {
    this.authUrl = 'https://auth.europe-west1.gcp.commercetools.com/oauth/token';
    this.clientId = '3ljXP8YjRgV-DMfceZhEJJML';
    this.clientSecret = '2E8pMbfsOizJs8MqWz8Kssj8AuOMWOOa';
    this.projectKey = '82mcjsovqo';
  }

  private getBase64EncodedCredentials() {
    const credentials = `${this.clientId}:${this.clientSecret}`;
    const encodedCredentials = btoa(credentials);
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

      const tokenResponse = await fetch(this.authUrl, {
        method: 'POST',
        headers: authHeaders,
        body: authData.toString(),
      });

      if (!tokenResponse.ok) {
        throw new Error(`Token request failed with status: ${tokenResponse.status}`);
      }

      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;

      return accessToken;
    } catch (error) {
      console.error('Error fetching access token:', error);
      throw error;
    }
  }
}

export default CommercetoolsAPI;
