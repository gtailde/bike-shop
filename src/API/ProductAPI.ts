import axios from 'axios';
import { CommercetoolsAPI } from './CommercetoolsAPI';
import type {
  ICategory,
  ICategoryList,
  IProduct,
  IProductList,
  IFiltersAPI,
  IFacetResult,
  ISort,
  IPerformRequestData,
} from 'types/types';

class ProductAPI extends CommercetoolsAPI {
  private async performGetRequest(
    endpoint: 'categories' | 'products',
    requestData?: IPerformRequestData,
  ): Promise<ICategoryList | IProductList | ICategory | IProduct> {
    try {
      const token = this.getToken();

      const url = `${this.apiUrl}/${this.projectKey}/${endpoint}/${requestData?.id ?? ''}/${
        requestData?.key ? 'key=' + requestData.key : ''
      }`;
      const params = {
        limit: requestData?.limit,
        offset: requestData?.offset ?? 0,
      };
      const headers = this.getTokenHeaders(token.access_token);

      const response = await axios.get(url, { headers, params });
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

  public async getCategories(limit = 100): Promise<ICategoryList> {
    return (await this.performGetRequest('categories', { limit })) as ICategoryList;
  }

  public async getProducts(limit = 8, offset = 0): Promise<IProductList> {
    return (await this.performGetRequest('products', { limit, offset })) as IProductList;
  }

  public async getCategory(CategoryIdent: string, type: 'id' | 'key'): Promise<ICategory> {
    return (await this.performGetRequest('categories', { [type]: CategoryIdent })) as ICategory;
  }

  public async getProduct(ProductId: string, type: 'id' | 'key'): Promise<IProduct> {
    return (await this.performGetRequest('products', { [type]: ProductId })) as IProduct;
  }

  public async getProductProjections(
    filters?: IFiltersAPI,
    sorting?: ISort,
    limit = 8,
    offset = 0,
  ): Promise<IProductList> {
    try {
      const token = this.getToken();
      const paramsData: string[] = [];

      if (filters?.brand?.length) {
        const brandFilter = `filter=variants.attributes.Brand:${filters.brand
          .map((brand) => `"${brand}"`)
          .join(',')}`;
        paramsData.push(brandFilter);
      }

      if (filters?.price) {
        const priceFilter = `filter=variants.price.centAmount:range(${
          filters.price.min ? filters.price.min * 100 : 0
        } to ${filters.price.max ? filters.price.max * 100 : '*'})`;
        paramsData.push(priceFilter);
      }

      if (filters?.size?.length) {
        const sizeFilter = `filter=variants.attributes.Size.key:${filters.size
          .map((size) => `"${size}"`)
          .join(',')}`;
        paramsData.push(sizeFilter);
      }

      if (filters?.category?.length) {
        const categoryFilter = `filter=categories.id:${filters.category
          .map((id) => `subtree("${id}")`)
          .join(',')}`;
        paramsData.push(categoryFilter);
      }

      if (filters?.searchText) {
        paramsData.push(`text.en-US=${String(filters.searchText)}`);
      }

      if (sorting?.method && sorting?.type) {
        const sortingParam = `sort=${sorting.method} ${sorting.type}`;
        paramsData.push(sortingParam);
      }

      paramsData.push(`limit=${limit}`);
      paramsData.push(`offset=${offset}`);

      const queryParams = paramsData.join('&');
      const url = `${this.apiUrl}/${this.projectKey}/product-projections/search?${queryParams}`;
      const headers = {
        Authorization: `Bearer ${token.access_token}`,
      };

      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      throw new Error('Error get product projections');
    }
  }
}

const productAPI = new ProductAPI();
export default productAPI;
