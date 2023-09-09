import { type IAddressData } from './types';

export const mergeAddressData = (
  addressList: IAddressData[],
  isDefaultControlList: IAddressData[],
) => {
  return addressList.map((address) => {
    const match = isDefaultControlList.find((item) => item.key === address.key);
    return match ?? address;
  });
};
