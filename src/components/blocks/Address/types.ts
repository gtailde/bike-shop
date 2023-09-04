export interface IProfileInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  password: string;
}

export interface IAddressFormData {
  title: string;
  country: string;
  city: string;
  street: string;
  postalCode: string;
}

export interface IAddressData extends IAddressFormData {
  id?: string;
  key: string;
  source: string;
  isDefault: boolean;
}
