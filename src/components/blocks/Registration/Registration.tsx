import './style.scss';
import React, { useState } from 'react';
import { Address } from './Address/Address';
import { type IAddressData } from './types';
import { Button } from 'components/UI/Button/Button';
import { Form } from 'components/UI/Form/Form';
import { Link } from 'react-router-dom';
import { pagePathnames } from 'router/pagePathnames';
import { getAddressesForPost } from './helpers';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { profileFormFields } from './formFields';
import { TextField } from 'components/UI/TextField/TextField';
import { profileFormSchema } from './schemes';

// const mockBillingData: IAddressData[] = [
//   {
//     id: 0,
//     source: 'Billing Address',
//     isDefault: true,
//     title: 'Home',
//     country: 'Random-country',
//     city: 'Random-City',
//     street: 'Random-street',
//     postalCode: '156788',
//   },
//   {
//     id: 2,
//     source: 'Billing Address',
//     isDefault: false,
//     title: 'Office',
//     country: 'Random-country',
//     city: 'Random-City',
//     street: 'Random-street',
//     postalCode: '156788',
//   },
// ];

// const mockShippingData: IAddressData[] = [
//   {
//     id: 1,
//     source: 'Shipping Address',
//     isDefault: true,
//     title: 'Work',
//     country: 'Random-country',
//     city: 'Random-City',
//     street: 'Random-street',
//     postalCode: '156788',
//   },
// ];

const AddressSectionName = {
  BILLING: 'Billing Address',
  SHIPPING: 'Shipping Address',
};

export const Registration = () => {
  const profileForm = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(profileFormSchema),
    mode: 'all',
  });

  const { register, handleSubmit, formState } = profileForm;
  const { errors } = formState;

  const [addressInfo, setAddressInfo] = useState([] as IAddressData[]);
  const [isSameAddress, setIsSameAddress] = useState(false);
  const [billingIsDefaultControlList, setBillingIsDefaultControlList] = useState(
    [] as IAddressData[],
  );
  const [shippingIsDefaultControlList, setShippingIsDefaultControlList] = useState(
    [] as IAddressData[],
  );

  const onSubmit = handleSubmit((data) => {
    const profileInfo = data;

    const billingInfo = getAddressesForPost(
      addressInfo,
      billingIsDefaultControlList,
      isSameAddress,
      AddressSectionName.BILLING,
    );

    const shippingInfo = getAddressesForPost(
      addressInfo,
      shippingIsDefaultControlList,
      isSameAddress,
      AddressSectionName.SHIPPING,
    );

    console.log('post registration data', { profileInfo, billingInfo, shippingInfo });
  });

  const handleChangeAddress = (addressList: IAddressData[]) => {
    setAddressInfo(addressList);
  };
  const handleIsSame = (value: boolean) => {
    setIsSameAddress(value);
  };

  const handleSetDefault = (
    setter: React.Dispatch<React.SetStateAction<IAddressData[]>>,
    addressList: IAddressData[],
  ) => {
    setter(addressList);
  };

  return (
    <section className="registration">
      <div className="registration__container page-wrapper">
        <header className="registration__header">
          <h2 className="visually-hidden">Registration form</h2>
          <p className="registration__title">Sign up</p>
          <p className="registration__description">Please sign up below</p>
        </header>
        <Form className="registration__form form" id="RegistrationForm" onSubmit={onSubmit}>
          <fieldset className="form__fieldset">
            <p className="form__fieldset-headline">
              <legend className="form__legend">Profile Info</legend>
            </p>
            <div className="form__fieldset-content">
              {profileFormFields.map(({ id, name, ...data }) => (
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
          </fieldset>
          <Address
            label={AddressSectionName.BILLING}
            onEdit={handleChangeAddress}
            onSetSame={handleIsSame}
            onSetDefault={handleSetDefault.bind(this, setBillingIsDefaultControlList)}
            isSameAddress={isSameAddress}
            addressList={addressInfo}
          />
          <Address
            label={AddressSectionName.SHIPPING}
            onEdit={handleChangeAddress}
            onSetSame={handleIsSame}
            onSetDefault={handleSetDefault.bind(this, setShippingIsDefaultControlList)}
            isSameAddress={isSameAddress}
            addressList={addressInfo}
          />
        </Form>
        <Button type="submit" form="RegistrationForm" accent>
          Sign Up
        </Button>
        <p className="registration__note">
          {'Already have an account? '}
          <Link to={pagePathnames.login} className="link">
            Log in!
          </Link>
        </p>
      </div>
    </section>
  );
};
