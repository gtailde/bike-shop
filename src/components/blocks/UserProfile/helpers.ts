import { type ICustomer } from 'types/types';
import { AddressSectionName } from './const';

export const getAddressInfo = ({
  addresses,
  billingAddressIds,
  shippingAddressIds,
  defaultBillingAddressId,
  defaultShippingAddressId,
}: ICustomer) => {
  const addressInfo = addresses.map((address) => {
    const addressSectionTag = billingAddressIds.includes(address.id)
      ? AddressSectionName.BILLING
      : shippingAddressIds.includes(address.id)
      ? AddressSectionName.SHIPPING
      : '';

    let isDefault = false;
    if (addressSectionTag === AddressSectionName.BILLING) {
      isDefault = defaultBillingAddressId === address.id;
    }
    if (addressSectionTag === AddressSectionName.SHIPPING) {
      isDefault = defaultShippingAddressId === address.id;
    }

    return {
      title: address.additionalAddressInfo,
      id: address.id,
      key: address.key,
      country: address.country,
      city: address.city,
      street: address.streetName,
      postalCode: address.postalCode,
      source: addressSectionTag,
      isDefault,
    };
  });

  return addressInfo;
};
