import axios from 'axios';
import { CommercetoolsAPI } from './CommercetoolsAPI';
import type {
  ICategory,
  ICategoryList,
  IProduct,
  IProductList,
  IFilters,
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
      let url = `${this.apiUrl}/${this.projectKey}/${endpoint}`;
      if (requestData?.id) url += `/${String(requestData.id)}`;
      url += `?limit=${String(requestData?.limit)}&offset=${String(requestData?.offset)}`;
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

  public async getProducts(limit = 8, offset = 0): Promise<IProductList> {
    return (await this.performGetRequest('products', { limit, offset })) as IProductList;
  }

  public async getCategory(CategoryId: string): Promise<ICategory> {
    return (await this.performGetRequest('categories', { id: CategoryId })) as ICategory;
  }

  public async getProduct(ProductId: string): Promise<IProduct> {
    return (await this.performGetRequest('products', { id: ProductId })) as IProduct;
  }

  public async getProductProjections(
    filters?: IFilters,
    sorting?: ISort,
    limit = 8,
    offset = 0,
  ): Promise<IProductList> {
    try {
      const token = this.getToken();
      const paramsData: string[] = [];

      if (filters?.brand) {
        const brandFilter = `filter=variants.attributes.Brand:${filters.brand
          .map((brand) => `"${brand}"`)
          .join(',')}`;
        paramsData.push(brandFilter);
      }

      if (filters?.price) {
        const priceFilter = `filter=variants.price.centAmount:range(${filters.price.min ?? 0} to ${
          filters.price.max ?? '*'
        })`;
        paramsData.push(priceFilter);
      }

      if (filters?.size) {
        const sizeFilter = `filter=variants.attributes.Size.key:${filters.size
          .map((size) => `"${size}"`)
          .join(',')}`;
        paramsData.push(sizeFilter);
      }

      if (filters?.categoryId) {
        const categoryFilter = `filter=categories.id:${filters.categoryId
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
