import { type ICustomer } from 'types/types';

export const customerInfo: ICustomer & { birthDate: string } = {
  id: 'b93ebd2a-3f3d-4ce8-9898-1d465c13c7e5',
  version: 1,
  versionModifiedAt: '2023-08-25T18:29:27.725Z',
  lastMessageSequenceNumber: 1,
  createdAt: '2023-08-25T18:29:27.725Z',
  lastModifiedAt: '2023-08-25T18:29:27.725Z',
  lastModifiedBy: {
    clientId: '3ljXP8YjRgV-DMfceZhEJJML',
    isPlatformClient: false,
    anonymousId: '084ea885-9832-4c31-afad-ffb8d6469ba2',
  },
  createdBy: {
    clientId: '3ljXP8YjRgV-DMfceZhEJJML',
    isPlatformClient: false,
    anonymousId: '084ea885-9832-4c31-afad-ffb8d6469ba2',
  },
  email: 'firebrand-rs@somemail.com',
  firstName: 'John',
  lastName: 'Doe',
  password: '****v3s=',
  addresses: [
    {
      id: '10001',
      key: '478949584758',
      country: 'DE',
      streetName: 'Random-street',
      postalCode: '156788',
      city: 'Random-City',
      additionalAddressInfo: 'Home',
    },
    {
      id: '10547',
      key: '428948784798',
      country: 'AU',
      streetName: 'Random-street',
      postalCode: '165798',
      city: 'Random-City',
      additionalAddressInfo: 'Office',
    },
    {
      id: '10777',
      key: '478238784798',
      country: 'US',
      streetName: 'Random-street',
      postalCode: '454378',
      city: 'Random-City',
      additionalAddressInfo: 'Work',
    },
  ],
  billingAddressIds: ['10001', '10547'],
  shippingAddressIds: ['10777'],
  isEmailVerified: false,
  stores: [
    {
      typeId: 'store',
      key: 'RSS-Bikes',
    },
  ],
  authenticationMode: 'Password',
  defaultBillingAddressId: '10001',
  defaultShippingAddressId: '10777',
  birthDate: '2003-08-25T10:23:03Z', // чего там по днями рождения?
};
