export interface ICustomer {
  addresses: string[];
  authenticationMode: string;
  billingAddressIds: string[];
  createdAt: string;
  createdBy: {
    clientId: string;
    isPlatformClient: boolean;
  };
  clientId: string;
  isPlatformClient: boolean;
  email: string;
  firstName: string;
  id: string;
  isEmailVerified: boolean;
  lastMessageSequenceNumber: number;
  lastModifiedAt: string;
  lastModifiedBy: {
    clientId: string;
    isPlatformClient: boolean;
  };
  lastName: string;
  password: string;
  shippingAddressIds: string[];
  stores: string[];
  version: number;
  versionModifiedAt: string;
}

interface ErrorDetail {
  code: string;
  message: string;
}

export interface IErrorResponse {
  statusCode: number;
  message: string;
  errors: ErrorDetail[];
}
