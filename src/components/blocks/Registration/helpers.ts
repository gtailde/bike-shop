import { type IAddressData } from '../../blocks/Address/types';
import { mergeAddressData } from 'components/blocks/Address/helpers';

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

export const disableAddressListControls = (addressList: IAddressData[]) => {
  return addressList.map((address) => ({ ...address, isDefault: false }));
};

export const changeAddressListItem = (
  addressList: IAddressData[],
  addressItem: IAddressData,
): IAddressData[] => {
  const index = addressList.findIndex((data) => data.key === addressItem.key);
  const newAddressData = [
    ...addressList.slice(0, index),
    addressItem,
    ...addressList.slice(index + 1),
  ];
  return newAddressData;
};
