//  customer

export interface ICustomer {
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: IClientInfo;
  createdBy: IClientInfo;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  password: string;
  addresses: IBaseAddress[];
  shippingAddressIds: string[];
  billingAddressIds: string[];
  isEmailVerified: boolean;
  stores: IStore[];
  authenticationMode: string;
  defaultBillingAddressId: string;
  defaultShippingAddressId: string;
}

export interface IClientInfo {
  clientId: string;
  isPlatformClient: boolean;
  anonymousId: string;
}

export interface IStore {
  typeId: string;
  key: string;
}

export interface IBaseAddress {
  id?: string;
  key: string;
  title: string;
  country: string;
  streetName: string;
  postalCode: string;
  city: string;
}

// product

export type IFilters = Record<string, string>;

export interface ICategory {
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: ICreatedByInfo;
  createdBy: ICreatedByInfo;
  key: string;
  name: {
    'en-US': string;
  };
  slug: {
    'en-US': string;
  };
  description: {
    'en-US': string;
  };
  ancestors: IProductTypeInfo[];
  parent?: IProductTypeInfo;
  orderHint: string;
  assets: string[];
}

export interface IProduct {
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: IClientInfo;
  createdBy: ICreatedByInfo;
  productType: IProductTypeInfo;
  masterData: IMasterData;
  priceMode: string;
  lastVariantId: string;
}

export interface ICreatedByInfo {
  isPlatformClient: boolean;
  user: {
    typeId: string;
    id: string;
  };
}

export interface IProductTypeInfo {
  typeId: string;
  id: string;
}

export interface IMasterData {
  current: IProductVariantData;
  staged: IProductVariantData;
  published: boolean;
  hasStagedChanges: boolean;
}

export interface IProductVariantData {
  name: {
    'en-US': string;
  };
  description: {
    'en-US': string;
  };
  categories: Array<{ id: string; typeId: string }>;

  categoryOrderHints: Record<string, string>;
  slug: {
    'en-US': string;
  };
  metaTitle: {
    'en-US': string;
  };
  metaDescription: {
    'en-US': string;
  };
  masterVariant: IProductVariant;
  variants: IProductVariant[];
  searchKeywords: Record<string, string>;
}

export interface IProductVariant {
  id: string;
  sku: string;
  prices: IProductPrice[];
  images: IProductImage[];
  attributes: IProductAttribute[];
  availability: {
    channels: Record<string, IProductAvailability>;
  };
}

export interface IProductDetails {
  id: string;
  name: string;
  categories: string[];
  titleImage: string;
  images: string[];
  description: string;
  specification: string;
  price: number;
  discountPrice?: number;
  options: Array<{ title: string; list: string[] }>;
}

export interface IProductPrice {
  id: string;
  value: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
  discounted: {
    value: {
      type: string;
      currencyCode: string;
      centAmount: number;
      fractionDigits: number;
    };
  };
}

export interface IProductImage {
  url: string;
  dimensions: {
    w: number;
    h: number;
  };
}

export interface IProductAttribute {
  name: string;
  value: string | { key: string; label: string };
}

export interface IProductAvailability {
  isOnStock: boolean;
  availableQuantity: number;
  version: number;
  id: string;
}

export interface IFacetResult {
  offset: number;
  count: number;
  results: IProduct[];
  facets: Record<string, { type: string; count: number }>;
}

// common

export type IAddressUpdateAction =
  | 'addBillingAddressId'
  | 'addShippingAddressId'
  | 'setDefaultBillingAddress'
  | 'setDefaultShippingAddress';

// error

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

// auth

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

// product-list

export interface IList {
  limit: number;
  offset: number;
  count: number;
  total: number;
}

export interface ICategoryList extends IList {
  results: ICategory[];
}

export interface IProductList extends IList {
  results: IProduct[];
}
