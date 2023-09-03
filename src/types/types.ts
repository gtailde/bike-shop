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
  createdBy: IClientInfo;
  description: Record<'en-US', string>;
  key: string;
  lastMessageSequenceNumber: number;
  lastModifiedAt: string;
  lastModifiedBy: IClientInfo;
  name: Record<'en-US', string>;
  orderHint: string;
  parent: ICategoryReference;
  slug: Record<'en-US', string>;
  version: number;
  versionModifiedAt: string;
}

export interface IProduct {
  id: string;
  version: number;
  productType: IProductTypeReference;
  name: Record<'en-US', string>;
  description: Record<'en-US', string>;
  categories: string[];
  categoryOrderHints: Record<string, string>;
  slug: Record<'en-US', string>;
  metaTitle: Record<'en-US', string>;
  metaDescription: Record<'en-US', string>;
  masterVariant: IProductVariant;
  variants: IProductVariant[];
  searchKeywords: Record<string, unknown>;
  hasStagedChanges: boolean;
  published: boolean;
  priceMode: string;
  createdAt: string;
  lastModifiedAt: string;
}

interface IClientInfo {
  isPlatformClient: boolean;
  user: IClientUser;
}

interface IClientUser {
  id: string;
  typeId: string;
}

interface ICategoryReference {
  id: string;
  typeId: string;
}

interface IProductTypeReference {
  typeId: string;
  id: string;
}

interface IProductVariant {
  id: number;
  sku: string;
  prices: IPrice[];
  images: IProductImage[];
  attributes: IAttribute[];
  assets: string[];
  availability: IAvailability | IAvailabilityChannel;
}

interface IPrice {
  id: string;
  value: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
}

interface IProductImage {
  url: string;
  dimensions: {
    w: number;
    h: number;
  };
}

interface IAttribute {
  name: string;
  value: string | IAttributeValue;
}

interface IAttributeValue {
  key: string;
  label: string;
}

interface IAvailability {
  isOnStock: boolean;
  availableQuantity: number;
  version: number;
  id: string;
}

interface IAvailabilityChannel {
  channels: Record<string, IAvailability>;
}

interface IStore {
  typeId: string;
  key: string;
}
