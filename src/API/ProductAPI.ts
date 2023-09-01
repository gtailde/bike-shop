import axios from 'axios';
import { CommercetoolsAPI } from './CommercetoolsAPI';

class ProductAPI extends CommercetoolsAPI {
  private async performGetRequest(endpoint: string): Promise<string> {
    try {
      const token = this.getToken();
      const url = `${this.apiUrl}/${this.projectKey}/${endpoint}`;
      const headers = this.getTokenHeaders(token.access_token);
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      throw new Error(`Error fetching ${endpoint} data`);
    }
  }

  public async getCategories() {
    return await this.performGetRequest('categories');
  }

  public async getProducts() {
    return await this.performGetRequest('products');
  }

  public async searchProduct(searchText: string, limit = 10, offset = 0): Promise<string> {
    try {
      const token = this.getToken();
      const url = `${this.apiUrl}/${this.projectKey}/product-projections/search`;

      const queryParams = new URLSearchParams({
        [`text.en-US`]: searchText,
        limit: limit.toString(),
        offset: offset.toString(),
      }).toString();

      const headers = this.getTokenHeaders(token.access_token);
      const response = await axios.get(`${url}?${queryParams}`, { headers });
      return response.data;
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      throw new Error('Error searching product projections by text');
    }
  }
}

const productAPI = new ProductAPI();
export default productAPI;
