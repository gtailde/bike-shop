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
