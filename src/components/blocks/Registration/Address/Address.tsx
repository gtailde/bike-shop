import React, { useState } from 'react';
import { Button } from 'components/UI/Button/Button';
import { AddressRecord } from '../AddressRecord/AddressRecord';
import { type IAddressData } from '../types';
import { ControlLabel } from 'components/UI/ControlLabel/ControlLabel';

interface IAddressProps extends React.ComponentProps<'fieldset'> {
  label: string;
  addressList: IAddressData[];
  isSameAddress: boolean;
  onEdit: (data: IAddressData[]) => void;
  onSetSame: (value: boolean) => void;
}

export const Address = ({
  isSameAddress,
  addressList,
  label,
  onEdit,
  onSetSame,
}: IAddressProps) => {
  const addressListClone = addressList.map(({ isDefault, source, ...address }) => ({
    ...address,
    source,
    isDefault: source === label ? isDefault : false,
  }));
  const newAddressRecordData: IAddressData = {
    id: +new Date(),
    source: label,
    isDefault: false,
    title: 'New address',
    country: '',
    city: '',
    street: '',
    postalCode: '',
  };
  const [controlIsDefaultList, setControlIsDefaultList] = useState(addressListClone);

  const mergedWithStateAddressList = addressListClone.map((address) => {
    const match = controlIsDefaultList.find((item) => item.id === address.id);
    return match ?? address;
  });
  const addressListToShow = isSameAddress
    ? mergedWithStateAddressList
    : mergedWithStateAddressList.filter((address) => address.source === label);

  const handleAddAddress = () => {
    const newAddressData = [...addressListClone, newAddressRecordData];
    onEdit(newAddressData);
  };
  const handleSaveAddress = (editedAddress: IAddressData) => {
    const index = addressListClone.findIndex((data) => data.id === editedAddress.id);
    const newAddressData = [
      ...addressListClone.slice(0, index),
      editedAddress,
      ...addressListClone.slice(index + 1),
    ];
    onEdit(newAddressData);
  };
  const handleDeleteAddress = (editedAddress: IAddressData) => {
    const index = addressListClone.findIndex((data) => data.id === editedAddress.id);
    const newAddressData = [
      ...addressListClone.slice(0, index),
      ...addressListClone.slice(index + 1),
    ];
    onEdit(newAddressData);
  };
  const handleSetDefaultAddress = (isDefault: boolean, addressId: number) => {
    const newAddressData = addressListClone.map((address) => ({ ...address, isDefault: false }));
    if (isDefault) {
      const index = addressListClone.findIndex((address) => address.id === addressId);
      newAddressData[index].isDefault = isDefault;
    }
    setControlIsDefaultList(newAddressData);
  };

  return (
    <fieldset className="form__fieldset">
      <p className="form__fieldset-headline">
        <legend className="form__legend">{label}</legend>
        <ControlLabel label="Addresses are the same" checked={isSameAddress} onChange={onSetSame} />
        <Button onClick={handleAddAddress}>Add</Button>
      </p>
      {addressListToShow.map((data) => (
        <AddressRecord
          key={data.id}
          data={data}
          onSave={handleSaveAddress}
          onDelete={handleDeleteAddress}
          onSetDefault={handleSetDefaultAddress}
        />
      ))}
    </fieldset>
  );
};
