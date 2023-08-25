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
