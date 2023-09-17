import axios from 'axios';
import { CommercetoolsAPI } from './CommercetoolsAPI';
import type { ICart, ICartList, IRequestData } from 'types/types';

class BasketAPI extends CommercetoolsAPI {
  private async performRequest(
    endpoint: string,
    request: 'get' | 'post' | 'delete',
    requestData?: IRequestData,
  ): Promise<ICart | ICartList> {
    try {
      const token = this.getToken();
      let url = `${this.apiUrl}/${this.projectKey}/me/${endpoint}`;
      const headers = this.getTokenHeaders(token.access_token);

      let response;

      if (requestData?.queryParams) url += `?${requestData.queryParams}`;

      if (request === 'get') {
        response = await axios.get(url, { headers });
      } else if (request === 'post' && requestData?.body) {
        response = await axios.post(url, requestData.body, { headers });
      } else if (request === 'delete') {
        response = await axios.delete(url, { headers });
      }
      return response?.data;
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      throw new Error(`Error fetching ${endpoint} data`);
    }
  }

  public async getActiveCart(): Promise<ICart> {
    return (await this.performRequest('active-cart', 'get')) as ICart;
  }

  public async createCart(): Promise<ICart> {
    return (await this.performRequest('carts', 'post', { body: { currency: 'USD' } })) as ICart;
  }

  public async deleteCart(cartIdent?: string, type?: 'id' | 'key'): Promise<ICart> {
    let cartI: string, cartV: number, typeI: string;
    if (cartIdent && type) {
      const getCart = await this.getCart(cartIdent, type);
      [cartI, cartV, typeI] = [getCart.id, getCart.version, 'id'];
    } else {
      const getMyCart = (await this.performRequest('active-cart', 'get')) as ICart;
      [cartI, cartV, typeI] = [getMyCart.id, getMyCart.version, 'id'];
    }

    return (await this.performRequest(
      `carts/${typeI === 'id' ? cartI : `key=${cartI}`}`,
      'delete',
      {
        queryParams: `version=${cartV}`,
      },
    )) as ICart;
  }

  // public async updateCart(): Promise<void> {}

  public async getCarts(limit = 20, offset = 0): Promise<ICartList> {
    const queryParams = `limit=${limit}&offset=${offset}`;
    return (await this.performRequest(`carts`, 'get', { queryParams })) as ICartList;
  }

  public async getCart(cartIdent: string, type: 'id' | 'key'): Promise<ICart> {
    return (await this.performRequest(
      `carts/${type === 'id' ? `${cartIdent}` : `key=${cartIdent}`}`,
      'get',
    )) as ICart;
  }
}

const basketAPI = new BasketAPI();
export default basketAPI;
