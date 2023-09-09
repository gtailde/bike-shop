import React, { type FC } from 'react';
import { TextField } from 'components/UI/TextField/TextField';
import { Button } from 'components/UI/Button/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { addressFormFields } from '../formFields';
import { addressFormSchema } from 'validations/validationSchemes';
import { type IAddressRecordEditProps } from '../types';

export const AddressRecordEdit: FC<IAddressRecordEditProps> = ({ onSave, onCancel, ...props }) => {
  const form = useForm({
    defaultValues: {
      title: props.title,
      country: props.country,
      city: props.city,
      streetName: props.streetName,
      postalCode: props.postalCode,
    },
    resolver: yupResolver(addressFormSchema),
    mode: 'all',
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  return (
    <div className="form__address-record address-record address-record--edit">
      <p className="address-record__title">Edit Address</p>
      <div className="address-record__content">
        {addressFormFields.map(({ name, ...data }) => (
          <TextField
            {...data}
            key={name}
            isValid={!errors[name]}
            helpText={errors[name]?.message}
            {...register(name)}
          />
        ))}
      </div>
      <div className="address-record__controls">
        <Button accent onClick={handleSubmit(onSave)}>
          Save
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  );
};
