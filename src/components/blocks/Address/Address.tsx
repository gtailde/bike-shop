import React, { type FC, useState } from 'react';
import { Button } from 'components/UI/Button/Button';
import { AddressRecord } from './AddressRecord/AddressRecord';
import { type IAddressData } from './types';
import { ControlLabel } from 'components/UI/ControlLabel/ControlLabel';
import { mergeAddressData } from './helpers';
import { type IAddressUpdateAction } from 'types/types';

interface IAddressProps extends React.ComponentProps<'fieldset'> {
  label: IAddressUpdateAction;
  addressList: IAddressData[];
  isSameAddress?: boolean;
  onEdit: (data: IAddressData) => void;
  onAdd: (data: IAddressData) => void;
  onDelete: (data: IAddressData) => void;
  onSetSame?: (value: boolean) => void;
  onSetDefault: (data: IAddressData) => void;
}

export const Address: FC<IAddressProps> = ({
  isSameAddress,
  addressList,
  label,
  onEdit,
  onAdd,
  onDelete,
  onSetSame,
  onSetDefault,
}) => {
  const addressListClone = addressList.map(({ isDefault, source, ...address }) => ({
    ...address,
    source,
    isDefault: source === label ? isDefault : false,
  }));

  const getNewAddressRecordData = () => {
    return {
      key: `addressRecord_${Date.now()}`,
      source: label,
      isDefault: false,
      title: 'New address',
      country: 'US',
      city: 'City',
      streetName: 'Street name',
      postalCode: '12345',
    };
  };
  const [controlIsDefaultList, setControlIsDefaultList] = useState<IAddressData[]>([]);

  const mergedWithStateAddressList = mergeAddressData(addressListClone, controlIsDefaultList);
  const addressListToShow = isSameAddress
    ? mergedWithStateAddressList
    : mergedWithStateAddressList.filter((address) => address.source === label);

  const handleAddAddress = () => {
    onAdd(getNewAddressRecordData());
  };
  const handleSaveAddress = (editedAddress: IAddressData) => {
    onEdit(editedAddress);
  };
  const handleDeleteAddress = (editedAddress: IAddressData) => {
    onDelete(editedAddress);
  };
  const handleSetDefaultAddress = (isDefault: boolean, addressKey: string) => {
    const newAddressData = addressListClone.map((address) => ({ ...address, isDefault: false }));
    const index = addressListClone.findIndex((address) => address.key === addressKey);
    const switchDefaultAddress = newAddressData[index];
    switchDefaultAddress.isDefault = isDefault;
    setControlIsDefaultList(newAddressData);
    onSetDefault(switchDefaultAddress);
  };

  return (
    <fieldset className="form__fieldset">
      <p className="form__fieldset-headline">
        <legend className="form__legend">
          {label === 'addBillingAddressId' || label === 'setDefaultBillingAddress'
            ? 'Billing Address'
            : 'Shipping Address'}
        </legend>
        {onSetSame && (
          <ControlLabel
            label="Addresses are the same"
            checked={isSameAddress}
            onChange={onSetSame}
          />
        )}
        <Button onClick={handleAddAddress}>Add</Button>
      </p>
      {addressListToShow.map((data) => (
        <AddressRecord
          key={data.key}
          data={data}
          onSave={handleSaveAddress}
          onDelete={handleDeleteAddress}
          onSetDefault={handleSetDefaultAddress}
        />
      ))}
    </fieldset>
  );
};
