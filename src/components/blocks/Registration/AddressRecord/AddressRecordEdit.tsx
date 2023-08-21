import React from 'react';
import { TextField } from 'components/UI/TextField/TextField';
import { Button } from 'components/UI/Button/Button';
import { type Form } from 'components/UI/Form/Form';
import { type IAddressData } from '../types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { addressFormFields } from '../formFields';
import { addressFormSchema } from '../schemes';

interface IAddressRecordEditProps extends IAddressData {
  onCancel: () => void;
  onSave: (data: IAddressData) => void;
}

export const AddressRecordEdit = (props: IAddressRecordEditProps) => {
  const form = useForm({
    defaultValues: {
      title: '',
      city: '',
      street: '',
    },
    resolver: yupResolver(addressFormSchema),
    mode: 'all',
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const addressRecordData: IAddressData = {
    id: props.id,
    source: props.source,
    isDefault: props.isDefault,
    title: '',
    country: '',
    city: '',
    street: '',
    postalCode: '',
  };

  return (
    <div className="form__address-record address-record address-record--edit">
      <p className="address-record__title">Edit Address</p>
      <div className="address-record__content">
        {addressFormFields.map(({ id, name, ...data }) => (
          <TextField
            {...data}
            key={id}
            isValid={!errors[name as keyof typeof errors]?.message}
            helpText={errors[name as keyof typeof errors]?.message}
            isTextShows={!!errors[name as keyof typeof errors]?.message}
            {...register(name as keyof typeof Form)}
          />
        ))}
      </div>
      <div className="address-record__controls">
        <Button
          accent
          onClick={handleSubmit((data) => {
            props.onSave({ ...addressRecordData, ...data });
          })}
        >
          Save
        </Button>
        <Button onClick={props.onCancel}>Cancel</Button>
      </div>
    </div>
  );
};
