import React, { type FC, useState } from 'react';
import './style.scss';
import { type IAddressFormData, type IAddressData, type IAddressRecordProps } from '../types';
import { Button } from 'components/UI/Button/Button';
import { ReactComponent as EditIcon } from './assets/edit-icon.svg';
import { ReactComponent as DeleteIcon } from './assets/delete-icon.svg';
import { ControlLabel } from 'components/UI/ControlLabel/ControlLabel';
import { AddressRecordEdit } from './AddressRecordEdit';

export const AddressRecord: FC<IAddressRecordProps> = ({
  data,
  onSave,
  onDelete,
  onSetDefault,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditAddress = () => {
    setIsEditMode(true);
  };
  const handleDeleteAddress = () => {
    onDelete(data);
  };
  const handleIsDefault = (value: boolean) => {
    onSetDefault(value, data.key);
  };
  const handleEditCancel = () => {
    setIsEditMode(false);
  };
  const handleEditSave = (editedData: IAddressFormData) => {
    setIsEditMode(false);
    onSave({
      ...data,
      ...editedData,
    });
  };

  const getTextContent = ({
    id,
    key,
    source,
    isDefault,
    title,
    ...descriptionProps
  }: IAddressData) => Object.values(descriptionProps).join(' ');

  return isEditMode ? (
    <AddressRecordEdit onCancel={handleEditCancel} onSave={handleEditSave} {...data} />
  ) : (
    <div className="form__address-record address-record">
      <p className="address-record__headline">
        <span className="address-record__name">{data.title}</span>
        <span className="address-record__headline-controls">
          <Button
            className="address-record__button button--icon-only"
            onClick={handleEditAddress}
            aria-label="Edit"
          >
            <EditIcon className="icon" />
          </Button>
          <Button
            className="address-record__button button--icon-only"
            onClick={handleDeleteAddress}
            aria-label="Delete"
          >
            <DeleteIcon className="icon" />
          </Button>
        </span>
      </p>
      <p className="address-record__text">{getTextContent(data)}</p>
      <ControlLabel
        label="Default"
        className="address-record__checkbox"
        checked={data.isDefault}
        onChange={handleIsDefault}
      ></ControlLabel>
    </div>
  );
};
