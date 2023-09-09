import axios from 'axios';
import { CommercetoolsAPI } from './CommercetoolsAPI';
import type {
  ICategory,
  ICategoryList,
  IProduct,
  IProductList,
  IFilters,
  IFacetResult,
} from 'types/types';

class ProductAPI extends CommercetoolsAPI {
  private async performGetRequest(
    endpoint: 'categories' | 'products',
    id?: string,
  ): Promise<ICategoryList | IProductList | ICategory | IProduct> {
    try {
      const token = this.getToken();
      let url = `${this.apiUrl}/${this.projectKey}/${endpoint}`;
      if (id) url += `/${id}`;
      const headers = this.getTokenHeaders(token.access_token);
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      throw new Error(`Error fetching ${endpoint} data`);
    }
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

  public async getCategories(): Promise<ICategoryList> {
    return (await this.performGetRequest('categories')) as ICategoryList;
  }

  public async getProducts(): Promise<IProductList> {
    return (await this.performGetRequest('products')) as IProductList;
  }

  public async getCategory(CategoryId: string): Promise<ICategory> {
    return (await this.performGetRequest('categories', CategoryId)) as ICategory;
  }

  public async getProduct(ProductId: string): Promise<IProduct> {
    return (await this.performGetRequest('products', ProductId)) as IProduct;
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

  public async getProductProjections(
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
