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

export type IFilters = Record<string, string>;

export interface ICategory {
  id: string;
  typeId: string;
  assets: string[];
  createdAt: string;
  createdBy: {
    isPlatformClient: boolean;
    user: {
      id: string;
      typeId: string;
    };
  };
  description: {
    'en-US': string;
  };
  key: string;
  lastMessageSequenceNumber: number;
  lastModifiedAt: string;
  lastModifiedBy: {
    isPlatformClient: boolean;
    user: {
      id: string;
      typeId: string;
    };
  };
  name: {
    'en-US': string;
  };
  orderHint: string;
  parent: {
    id: string;
    typeId: string;
  };
  slug: {
    'en-US': string;
  };
  version: number;
  versionModifiedAt: string;
}

export interface IProduct {
  id: string;
  version: number;
  productType: {
    typeId: string;
    id: string;
  };
  name: {
    'en-US': string;
  };
  description: {
    'en-US': string;
  };
  categories: string[];
  categoryOrderHints: { [key: string]: string };
  slug: {
    'en-US': string;
  };
  metaTitle: {
    'en-US': string;
  };
  metaDescription: {
    'en-US': string;
  };
  masterVariant: ProductVariant;
  variants: ProductVariant[];
  searchKeywords: { [key: string]: any };
  hasStagedChanges: boolean;
  published: boolean;
  priceMode: string;
  createdAt: string;
  lastModifiedAt: string;
}

interface ProductVariant {
  id: number;
  sku: string;
  prices: Price[];
  images: ProductImage[];
  attributes: Attribute[];
  assets: string[];
  availability: Availability | AvailabilityChannel;
}

interface Price {
  id: string;
  value: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
}

interface ProductImage {
  url: string;
  dimensions: {
    w: number;
    h: number;
  };
}

interface Attribute {
  name: string;
  value: string | AttributeValue;
}

interface AttributeValue {
  key: string;
  label: string;
}

interface Availability {
  isOnStock: boolean;
  availableQuantity: number;
  version: number;
  id: string;
}

interface AvailabilityChannel {
  channels: { [key: string]: Availability };
}
