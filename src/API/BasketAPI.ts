import axios from 'axios';
import { CommercetoolsAPI } from './CommercetoolsAPI';
import type { ICart, IErrorResponse, IRequestData } from 'types/types';

class BasketAPI extends CommercetoolsAPI {
  private async performRequest(
    endpoint: string,
    request: 'get' | 'post' | 'delete',
    requestData?: IRequestData,
  ): Promise<ICart | IErrorResponse> {
    try {
      const token = this.getToken();
      let url = `${this.apiUrl}/${this.projectKey}/in-store/key=${this.storeKey}/me/${endpoint}`;
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
      return this.handleError(error, `Failed ${endpoint} request`);
    }
  }

  public async getActiveCart(): Promise<ICart> {
    let activeCart = await this.performRequest('active-cart', 'get');
    if (!('id' in activeCart)) {
      activeCart = await this.createCart();
    }
    return activeCart as ICart;
  }

  private async createCart(): Promise<ICart | IErrorResponse> {
    return await this.performRequest('carts', 'post', { body: { currency: 'USD' } });
  }

  public async clearCart(): Promise<ICart | IErrorResponse> {
    const getActiveCart = await this.getActiveCart();
    const [cartI, cartV] = [getActiveCart.id, getActiveCart.version];
    await this.performRequest(`carts/${cartI}`, 'delete', {
      queryParams: `version=${cartV}`,
    });
    return await this.createCart();
  }

  public async addToCart(
    productId: string,
    variantId: number,
    quantity: number,
  ): Promise<ICart | IErrorResponse> {
    const getActiveCart = await this.getActiveCart();
    const [cartI, cartV] = [getActiveCart.id, getActiveCart.version];

    const body = {
      version: cartV,
      actions: [
        {
          action: 'addLineItem',
          productId,
          variantId,
          quantity,
        },
      ],
    };

    return await this.performRequest(`carts/${cartI}`, 'post', { body });
  }

  public async changeQuantity(
    lineItemId: string,
    quantity: number,
  ): Promise<ICart | IErrorResponse> {
    const getActiveCart = await this.getActiveCart();
    const [cartI, cartV] = [getActiveCart.id, getActiveCart.version];

    const body = {
      version: cartV,
      actions: [
        {
          action: 'changeLineItemQuantity',
          lineItemId,
          quantity,
        },
      ],
    };

    return await this.performRequest(`carts/${cartI}`, 'post', { body });
  }

  public async removefromCart(lineItemId: string): Promise<ICart | IErrorResponse> {
    const getActiveCart = await this.getActiveCart();
    const [cartI, cartV] = [getActiveCart.id, getActiveCart.version];

    const body = {
      version: cartV,
      actions: [
        {
          action: 'removeLineItem',
          lineItemId,
        },
      ],
    };

    return await this.performRequest(`carts/${cartI}`, 'post', { body });
  }
}

const basketAPI = new BasketAPI();
export default basketAPI;
