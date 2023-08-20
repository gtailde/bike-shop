import { type IAddressData } from './types';

export const mergeAddressData = (
  addressList: IAddressData[],
  isDefaultControlList: IAddressData[],
) => {
  return addressList.map((address) => {
    const match = isDefaultControlList.find((item) => item.id === address.id);
    return match ?? address;
  });
};

export const getAddressesForPost = (
  sharedList: IAddressData[],
  controlSet: IAddressData[],
  isSameAddress: boolean,
  addressSection: string,
) => {
  return isSameAddress
    ? mergeAddressData(sharedList, controlSet)
    : mergeAddressData(sharedList, controlSet).filter(
        (address) => address.source === addressSection,
      );
};
