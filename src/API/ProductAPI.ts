import axios from 'axios';
import { CommercetoolsAPI } from './CommercetoolsAPI';
import { type ICategoryResponse, type IFacetResult } from 'types/types';

class ProductAPI extends CommercetoolsAPI {
  private async performGetRequest<T>(endpoint: string): Promise<T> {
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
    return await this.performGetRequest<ICategoryResponse>('categories?limit=200');
  }

  public async getProducts() {
    return await this.performGetRequest('products');
  }

  public async filter(categoryId: string): Promise<IFacetResult> {
    try {
      const token = this.getToken();
      const url = `${this.apiUrl}/${this.projectKey}/product-projections/search`;

      const queryParams = new URLSearchParams({
        filter: `categories.id: subtree("${categoryId}")`,
      }).toString();

      const headers = this.getTokenHeaders(token.access_token);
      const response = await axios.get(`${url}?${queryParams}`, { headers });
      return response.data;
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      throw new Error('Error filtering product projections by category');
    }
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
