import React, { useState } from 'react';
import { type ITextFieldProps } from 'components/UI/TextField/types';
import { TextField } from 'components/UI/TextField/TextField';
import { Button } from 'components/UI/Button/Button';
import { type IAddressData } from '../types';

interface IAddressRecordEditProps extends IAddressData {
  onCancel: () => void;
  onSave: (data: IAddressData) => void;
}

export const AddressRecordEdit = (props: IAddressRecordEditProps) => {
  const [title, setTitle] = useState(props.title);
  const [country, setCountry] = useState(props.country);
  const [city, setCity] = useState(props.city);
  const [street, setStreet] = useState(props.street);
  const [postalCode, setPostalCode] = useState(props.postalCode);
  const addressRecordData: IAddressData = {
    id: props.id,
    source: props.source,
    isDefault: props.isDefault,
    title,
    country,
    city,
    street,
    postalCode,
  };

  const formFields: ITextFieldProps[] = [
    {
      id: '1',
      type: 'text',
      label: 'Title',
      value: title,
      onChange: (value: string) => {
        setTitle(value);
      },
    },
    {
      id: '2',
      type: 'text',
      label: 'Country',
      value: country,
      onChange: (value: string) => {
        setCountry(value);
      },
    },
    {
      id: '3',
      type: 'text',
      label: 'City',
      value: city,
      onChange: (value: string) => {
        setCity(value);
      },
    },
    {
      id: '4',
      type: 'text',
      label: 'Street',
      value: street,
      onChange: (value: string) => {
        setStreet(value);
      },
    },
    {
      id: '5',
      type: 'text',
      label: 'Postal Code',
      value: postalCode,
      onChange: (value: string) => {
        setPostalCode(value);
      },
    },
  ];

  return (
    <div className="form__address-record address-record address-record--edit">
      <p className="address-record__title">Edit Address</p>
      <div className="address-record__content">
        {formFields.map(({ id, ...data }) => (
          <TextField key={id} {...data} />
        ))}
      </div>
      <div className="address-record__controls">
        <Button
          accent
          onClick={() => {
            props.onSave(addressRecordData);
          }}
        >
          Save
        </Button>
        <Button onClick={props.onCancel}>Cancel</Button>
      </div>
    </div>
  );
};
