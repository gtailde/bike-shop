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
      const url = `${this.apiUrl}/${this.projectKey}/me/${endpoint}`;
      const headers = this.getTokenHeaders(token.access_token);

      let response;

      if (request === 'get') {
        response = await axios.get(url, { headers });
      } else if (request === 'post' && requestData?.body) {
        response = await axios.post(url, requestData.body, { headers });
      } else if (request === 'delete' && requestData?.queryParams) {
        response = await axios.delete(`${url}?${String(requestData.queryParams)}`);
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

  public async deleteCart(cartIdent?: string, type?: 'id' | 'key'): Promise<void> {
    let cartI: string, cartV: number, typeI: string;
    if (cartIdent && type) {
      const getCart = await this.getCart(cartIdent, type);
      [cartI, cartV, typeI] = [getCart.id, getCart.version, 'id'];
    } else {
      const getMyCart = (await this.performRequest('active-cart', 'get')) as ICart;
      [cartI, cartV, typeI] = [getMyCart.id, getMyCart.version, 'id'];
    }

    // Включаем cart-id и cart-version в URL для DELETE запроса
    await this.performRequest(`carts/${cartI}`, 'delete', {
      queryParams: `version=${cartV}`,
    });
  }

  // public async updateCart(): Promise<void> {}

  public async getCarts(limit = 20, offset = 0): Promise<ICartList> {
    // add
    return (await this.performRequest(`carts`, 'get')) as ICartList;
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
