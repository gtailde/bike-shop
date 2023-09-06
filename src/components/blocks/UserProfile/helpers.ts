import { type ICustomer, type IAddressUpdateAction, type IBaseAddress } from 'types/types';
import { AddressActionName } from '../../../const';
import { type IAddressData } from '../Address/types';

export const getAddressInfo = ({
  addresses,
  billingAddressIds,
  shippingAddressIds,
  defaultBillingAddressId,
  defaultShippingAddressId,
}: ICustomer) => {
  const addressInfo = addresses.map((address) => {
    const addressSectionTag = billingAddressIds.includes(address.id ?? '')
      ? AddressActionName.BILLING
      : shippingAddressIds.includes(address.id ?? '')
      ? AddressActionName.SHIPPING
      : '';

    let isDefault = false;
    if (addressSectionTag === AddressActionName.BILLING) {
      isDefault = defaultBillingAddressId === address.id;
    }
    if (addressSectionTag === AddressActionName.SHIPPING) {
      isDefault = defaultShippingAddressId === address.id;
    }

    return {
      title: address.title,
      id: address.id,
      key: address.key,
      country: address.country,
      city: address.city,
      streetName: address.streetName,
      postalCode: address.postalCode,
      source: addressSectionTag as IAddressUpdateAction,
      isDefault,
    };
  });

  return addressInfo;
};

export const extractBaseAddressFromAddressData = (addressData: IAddressData): IBaseAddress => {
  return {
    key: addressData.key,
    country: addressData.country.toUpperCase(),
    streetName: addressData.streetName,
    postalCode: addressData.postalCode,
    city: addressData.city,
    title: addressData.title,
  };
};
