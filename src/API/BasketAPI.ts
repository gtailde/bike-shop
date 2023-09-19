import axios from 'axios';
import { CommercetoolsAPI } from './CommercetoolsAPI';
import type { ICart, IRequestData } from 'types/types';
import { errorNotify } from 'Notifiers';

class BasketAPI extends CommercetoolsAPI {
  private async performRequest(
    endpoint: string,
    request: 'get' | 'post' | 'delete',
    requestData?: IRequestData,
  ): Promise<ICart | null> {
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
      errorNotify(
        `Something went wrong: ${this.handleError(error, `Failed ${endpoint} request`).message}`,
      );
      return null;
    }
  }

  public async getActiveCart(): Promise<ICart> {
    let activeCart = await this.performRequest('active-cart', 'get');
    if (!activeCart) {
      activeCart = await this.createCart();
    }
    return activeCart as ICart;
  }

  private async createCart(): Promise<ICart | null> {
    return await this.performRequest('carts', 'post', { body: { currency: 'USD' } });
  }

  public async clearCart(): Promise<ICart | null> {
    const activeCart = await this.getActiveCart();
    const [cartI, cartV] = [activeCart.id, activeCart.version];
    await this.performRequest(`carts/${cartI}`, 'delete', {
      queryParams: `version=${cartV}`,
    });
    return await this.createCart();
  }

  public async addToCart(
    productId: string,
    variantId: number,
    quantity: number,
  ): Promise<ICart | null> {
    const activeCart = await this.getActiveCart();
    const [cartI, cartV] = [activeCart.id, activeCart.version];

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

  public async changeQuantity(lineItemId: string, quantity: number): Promise<ICart | null> {
    const activeCart = await this.getActiveCart();
    const [cartI, cartV] = [activeCart.id, activeCart.version];

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

  public async removeFromCart(lineItemId: string): Promise<ICart | null> {
    const activeCart = await this.getActiveCart();
    const [cartI, cartV] = [activeCart.id, activeCart.version];

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

  public async recalculate(): Promise<ICart | null> {
    const activeCart = await this.getActiveCart();
    const [cartI, cartV] = [activeCart.id, activeCart.version];

    const body = {
      version: cartV,
      actions: [
        {
          action: 'recalculate',
          updateProductData: true,
        },
      ],
    };

    return await this.performRequest(`carts/${cartI}`, 'post', { body });
  }

  public async addDiscountCode(code: string): Promise<ICart | null> {
    const activeCart = await this.getActiveCart();
    const [cartI, cartV] = [activeCart.id, activeCart.version];

    const body = {
      version: cartV,
      actions: [
        {
          action: 'addDiscountCode',
          code,
        },
      ],
    };

    return await this.performRequest(`carts/${cartI}`, 'post', { body });
  }

  public async removeDiscountCode(codeId: string): Promise<ICart | null> {
    const activeCart = await this.getActiveCart();
    const [cartI, cartV] = [activeCart.id, activeCart.version];

    const body = {
      version: cartV,
      actions: [
        {
          action: 'removeDiscountCode',
          discountCode: {
            typeId: 'discount-code',
            id: codeId,
          },
        },
      ],
    };

    return await this.performRequest(`carts/${cartI}`, 'post', { body });
  }
}

const basketAPI = new BasketAPI();
export default basketAPI;
