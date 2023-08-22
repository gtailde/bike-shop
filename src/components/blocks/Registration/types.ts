export interface IProfileInfo {
  firstName: string;
  lastName: string;
  birthDateName: string;
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
  id: number;
  source: string;
  isDefault: boolean;
}
