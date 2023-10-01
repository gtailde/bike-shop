import axios from 'axios';
import { CommercetoolsAPI } from './CommercetoolsAPI';
import type { ICart, IRequestData, requestMethod } from 'types/types';
import { errorNotify } from 'Notifiers';

class BasketAPI extends CommercetoolsAPI {
  cartId: string | null;
  cartVersion: number | null;

  constructor() {
    super();
    this.cartId = null;
    this.cartVersion = null;
  }

  private setActiveCartData(id?: string, version?: number) {
    this.cartId = id ?? null;
    this.cartVersion = version ?? null;
  }

  private async performRequest(
    endpoint: string,
    method: requestMethod,
    requestData?: IRequestData,
  ): Promise<ICart | null> {
    try {
      const token = this.getToken();
      const url = `${this.apiUrl}/${this.projectKey}/in-store/key=${this.storeKey}/me/${endpoint}`;
      const headers = this.getTokenHeaders(token.access_token);

      const response = await axios({
        url,
        method,
        headers,
        data: requestData?.body,
        params: requestData?.queryParams,
      });

      return response?.data;
    } catch (error) {
      errorNotify(
        `Something went wrong: ${this.handleError(error, `Failed ${endpoint} request`).message}`,
      );
      return null;
    }
  }

  public async getActiveCart(): Promise<ICart | null> {
    let activeCart = await this.performRequest('active-cart', 'get');

    if (!activeCart) {
      activeCart = await this.createCart();
    }
    this.setActiveCartData(activeCart?.id, activeCart?.version);

    return activeCart;
  }

  private async createCart(): Promise<ICart | null> {
    return await this.performRequest('carts', 'post', { body: { currency: 'USD' } });
  }

  public async clearCart(): Promise<ICart | null> {
    await this.performRequest(`carts/${this.cartId ?? ''}`, 'delete', {
      queryParams: {
        version: String(this.cartVersion ?? 0),
      },
    });

    const response = await this.createCart();
    this.setActiveCartData(response?.id, response?.version);

    return response;
  }

  public async addToCart(
    productId: string,
    variantId: number,
    quantity: number,
  ): Promise<ICart | null> {
    const body = {
      version: this.cartVersion ?? 0,
      actions: [
        {
          action: 'addLineItem',
          productId,
          variantId,
          quantity,
        },
      ],
    };

    const response = await this.performRequest(`carts/${this.cartId ?? ''}`, 'post', { body });
    this.setActiveCartData(response?.id, response?.version);

    return response;
  }

  public async changeQuantity(lineItemId: string, quantity: number): Promise<ICart | null> {
    const body = {
      version: this.cartVersion ?? 0,
      actions: [
        {
          action: 'changeLineItemQuantity',
          lineItemId,
          quantity,
        },
      ],
    };

    const response = await this.performRequest(`carts/${this.cartId ?? ''}`, 'post', { body });
    this.setActiveCartData(response?.id, response?.version);

    return response;
  }

  public async removeFromCart(lineItemId: string): Promise<ICart | null> {
    const body = {
      version: this.cartVersion ?? 0,
      actions: [
        {
          action: 'removeLineItem',
          lineItemId,
        },
      ],
    };

    const response = await this.performRequest(`carts/${this.cartId ?? ''}`, 'post', { body });
    this.setActiveCartData(response?.id, response?.version);

    return response;
  }

  public async recalculate(): Promise<ICart | null> {
    const body = {
      version: this.cartVersion ?? 0,
      actions: [
        {
          action: 'recalculate',
          updateProductData: true,
        },
      ],
    };

    const response = await this.performRequest(`carts/${this.cartId ?? ''}`, 'post', { body });
    this.setActiveCartData(response?.id, response?.version);

    return response;
  }

  public async addDiscountCode(code: string): Promise<ICart | null> {
    const body = {
      version: this.cartVersion ?? 0,
      actions: [
        {
          action: 'addDiscountCode',
          code,
        },
      ],
    };

    const response = await this.performRequest(`carts/${this.cartId ?? ''}`, 'post', { body });
    this.setActiveCartData(response?.id, response?.version);

    return response;
  }

  public async removeDiscountCode(codeId: string): Promise<ICart | null> {
    const body = {
      version: this.cartVersion ?? 0,
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

    const response = await this.performRequest(`carts/${this.cartId ?? ''}`, 'post', { body });
    this.setActiveCartData(response?.id, response?.version);

    return response;
  }
}

const basketAPI = new BasketAPI();
export default basketAPI;
