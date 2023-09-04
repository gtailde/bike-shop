export interface ICustomer {
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: {
    clientId: string;
    isPlatformClient: boolean;
    anonymousId: string;
  };
  createdBy: {
    clientId: string;
    isPlatformClient: boolean;
    anonymousId: string;
  };
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  addresses: IBaseAddress[];
  shippingAddressIds: string[];
  billingAddressIds: string[];
  isEmailVerified: boolean;
  stores: Array<{
    typeId: string;
    key: string;
  }>;
  authenticationMode: string;
  defaultBillingAddressId: string;
  defaultShippingAddressId: string;
}

export interface IBaseAddress {
  id: string;
  key: string;
  // ...
  country: string;
  streetName: string;
  postalCode: string;
  city: string;
  // ...
  additionalAddressInfo: string;
}

export type IUpdateAction =
  | 'changeEmail'
  | 'setFirstName'
  | 'setLastName'
  | 'addAddress'
  | 'changeAddress'
  | 'removeAddress'
  | 'setDefaultShippingAddress'
  | 'addShippingAddressId'
  | 'removeShippingAddressId'
  | 'setDefaultBillingAddress'
  | 'addBillingAddressId'
  | 'removeBillingAddressId';

export interface IAction {
  action: IUpdateAction;
}

interface ErrorDetail {
  code: string;
  message: string;
}

export interface IErrorResponse {
  statusCode: number;
  message: string;
  errors: ErrorDetail[];
  error?: string;
  error_description?: string;
}

export interface IAccessToken {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
  refresh_token?: string;
}

export interface ITokenData {
  active: boolean;
  client_id?: string;
  exp?: number;
  scope?: string;
}

export interface ICategory {
  id: string;
  key: string;
  name: {
    ['en-US']: string;
  };
  description: string;
  ancestors: ICategoryReference[];
  parent?: ICategoryReference;
  orderHint: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
}

interface ICategoryReference {
  id: string;
  typeId: string;
  obj: ICategory;
}

export interface ICategoryResponse {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: ICategory[];
}

export interface IFacetResult {
  offset: number;
  count: number;
  results: IProduct[];
  facets: Record<string, { type: string; count: number }>;
}

interface IProduct {
  categories: Array<{ id: string; typeId: string }>;
  description: { 'en-US': string };
  masterVariant: IProductVariant;
  name: { 'en-US': string };
  published: true;
  searchKeywords: {};
  variants: IProductVariant[];
}

interface IProductVariant {
  attributes: Array<{ name: string; value: string }>;
  availability: { isOnStock: boolean; availableQuantity: number; id: string };
  id: number;
  images: Array<{ dimensions: { h: number; w: number }; url: string }>;
  prices: Array<{ id: string; value: { centAmount: number; currencyCode: string } }>;
}
