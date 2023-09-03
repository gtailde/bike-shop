import axios from 'axios';
import { CommercetoolsAPI } from './CommercetoolsAPI';
import type { ICategory, IFilters, IProduct } from 'types/types';

class ProductAPI extends CommercetoolsAPI {
  public async getCategories(): Promise<ICategory[]> {
    try {
      const token = this.getToken();
      const url = `${this.apiUrl}/${this.projectKey}/categories`;
      const headers = this.getTokenHeaders(token.access_token);
      const response = await axios.get(url, { headers });
      return response.data.results;
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      throw new Error(`Error fetching categories data`);
    }
  }

  public async searchProduct(searchText: string, limit = 10, offset = 0): Promise<IProduct[]> {
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
      return response.data.results;
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      throw new Error('Error searching product projections by text');
    }
  }

  public async getProducts(
    filters: IFilters = { brand: '', color: '' },
    sorting = 'name.en-US asc',
  ): Promise<IProduct[]> {
    try {
      const token = this.getToken();
      const queryParams = Object.entries(filters)
        .map(([key, value]) => `${key}="${value}"`)
        .join('&');
      const url = `${this.apiUrl}/${this.projectKey}/product-projections?where=${queryParams}&sort=${sorting}`;
      const headers = {
        Authorization: `Bearer ${token.access_token}`,
      };
      const response = await axios.get(url, { headers });
      return response.data.results;
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      throw new Error('Error get product projections');
    }
  }
}

const productAPI = new ProductAPI();
export default productAPI;
