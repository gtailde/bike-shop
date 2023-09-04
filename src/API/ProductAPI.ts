import axios from 'axios';
import { CommercetoolsAPI } from './CommercetoolsAPI';
import type { ICategoryList, IProductList } from 'types/types';

class ProductAPI extends CommercetoolsAPI {
  private async performGetRequest(endpoint: string): Promise<ICategoryList | IProductList> {
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

  public async getCategories(): Promise<ICategoryList> {
    return (await this.performGetRequest('categories')) as ICategoryList;
  }

  public async getProducts(): Promise<IProductList> {
    return (await this.performGetRequest('products')) as IProductList;
  }

  public async searchProduct(searchText: string, limit = 20, offset = 0): Promise<IProductList> {
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
