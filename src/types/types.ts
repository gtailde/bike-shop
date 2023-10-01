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

export interface IFiltersAPI {
  brand?: string[];
  size?: string[];
  category?: string[];
  price?: {
    min?: number;
    max?: number;
  };
  searchText?: string;
}

export type IFilters = Omit<IFiltersAPI, 'searchText'>;

export type SortMethod = 'price' | 'name.en-US';
export type SortType = 'asc' | 'desc';

export interface ISort {
  method?: SortMethod;
  type?: SortType;
}

export interface IPerformRequestData {
  limit?: number;
  offset?: number;
  id?: string;
  key?: string;
}

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
  id: number;
  sku: string;
  prices: IProductPrice[];
  images: IProductImage[];
  attributes: IProductAttribute[];
  availability: {
    id: string;
    channels: Record<string, IProductAvailability>;
    availableQuantity: number;
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
  value: ICentPrecisionMoney;
  discounted: {
    value: ICentPrecisionMoney;
  };
}

export interface ICentPrecisionMoney {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
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

export type requestMethod = 'get' | 'post' | 'delete';

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
  anonymous_id?: string;
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

// cart

interface IDiscountCode {
  id: string;
  typeId: string;
  state: string;
}

interface IAction {
  action?: string;
  quantity?: number;
  variantId?: number;
  lineItemId?: string;
  productId?: string;
}

export interface IRequestData {
  body?:
    | Record<string, string | number>
    | {
        version: number;
        actions: IAction[];
      }
    | { reference: { id: string; typeId: string } };
  queryParams?: Record<string, string>;
}

export interface ICartCommonFields {
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: IClientInfo;
  createdBy: IClientInfo;
}

export interface ILineItem extends ICartCommonFields {
  addedAt: string;
  discountedPricePerQuantity: string[]; // Заменить 'string'
  discountedPrice: {
    includedDiscounts?: Array<{ discountedAmount: ICentPrecisionMoney }>;
    value: ICentPrecisionMoney;
  };
  lineItemMode: string;
  name: Record<string, string>;
  perMethodTaxRate: string[]; // Заменить 'string'
  price: {
    id: string;
    value: {
      type: string;
      currencyCode: string;
      centAmount: number;
      fractionDigits: number;
    };
    discounted: {
      discount: { id: string; typeId: string };
      value: ICentPrecisionMoney;
    };
  };
  priceMode: string;
  productId: string;
  productKey: string;
  productSlug: Record<string, string>;
  productType: {
    typeId: string;
    id: string;
    version: number;
  };
  quantity: number;
  state: string[]; // Заменить 'string'
  taxedPricePortions: string[]; // Заменить 'string'
  totalPrice: ICentPrecisionMoney;
  variant: {
    assets: string[]; // Заменить 'string'
    attributes: IProductAttribute[];
    availability: {
      availableQuantity: number;
      id: string;
      isOnStock: boolean;
      version: number;
    };
    images: Array<{ url: string }>;
  };
  sku: string;
}

export interface ICart extends ICartCommonFields {
  anonymousId?: string;
  customerId?: string;
  lineItems: ILineItem[];
  cartState: string;
  totalPrice: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
  shippingMode: string;
  shipping: string[]; // Заменить 'string'
  customLineItems: string[]; // Заменить 'string'
  discountCodes: IDiscountCode[];
  directDiscounts: string[]; // Заменить 'string'
  inventoryMode: string;
  taxMode: string;
  taxRoundingMode: string;
  taxCalculationMode: string;
  deleteDaysAfterLastModification: number;
  refusedGifts: string[]; // Заменить 'string'
  origin: string;
  itemShippingAddresses: string[]; // Заменить 'string'
  store: IStore;
  totalLineItemQuantity: number;
}
