import './style.scss';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Address } from '../../blocks/Address/Address';
import { type IAddressData } from '../../blocks/Address/types';
import { Button } from 'components/UI/Button/Button';
import { Form } from 'components/UI/Form/Form';
import { pagePathnames } from 'router/pagePathnames';
import { AddressActionName } from '../../../const';
import { changeAddressListItem, disableAddressListControls, getAddressesForPost } from './helpers';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { profileFormFields } from './formFields';
import { TextField } from 'components/UI/TextField/TextField';
import { profileFormSchema } from './schemes';
import { customersApi } from 'API/CustomersAPI';

export const Registration = () => {
  const profileForm = useForm({
    resolver: yupResolver(profileFormSchema),
    mode: 'all',
  });

  const { register, handleSubmit, formState } = profileForm;
  const { errors } = formState;

  const navigate = useNavigate();

  const [addressInfo, setAddressInfo] = useState<IAddressData[]>([]);
  const [isSameAddress, setIsSameAddress] = useState(false);
  const [billingIsDefaultControlList, setBillingIsDefaultControlList] = useState<IAddressData[]>(
    [],
  );
  const [shippingIsDefaultControlList, setShippingIsDefaultControlList] = useState<IAddressData[]>(
    [],
  );

  const onSubmit = handleSubmit(async (profileInfo) => {
    const billingInfo = getAddressesForPost(
      addressInfo,
      billingIsDefaultControlList,
      isSameAddress,
      AddressActionName.BILLING,
    );

    const shippingInfo = getAddressesForPost(
      addressInfo,
      shippingIsDefaultControlList,
      isSameAddress,
      AddressActionName.SHIPPING,
    );
    const response = await customersApi.registerCustomer(
      profileInfo.email,
      profileInfo.firstName,
      profileInfo.lastName,
      profileInfo.password,
    );

    if ('id' in response) navigate(pagePathnames.main, { replace: true });
  });

  const handleChangeAddress = (addressObject: IAddressData) => {
    const newAddressData = changeAddressListItem(addressInfo, addressObject);
    setAddressInfo(newAddressData);
  };

  const handleAddAddress = (addressList: IAddressData) => {
    const newAddressData = [...addressInfo, addressList];
    setAddressInfo(newAddressData);
  };

  const handleDeleteAddress = (addressList: IAddressData) => {
    const index = addressInfo.findIndex((data) => data.key === addressList.key);
    const newAddressData = [...addressInfo.slice(0, index), ...addressInfo.slice(index + 1)];
    setAddressInfo(newAddressData);
  };

  const handleIsSame = (value: boolean) => {
    setIsSameAddress(value);
  };

  const handleSetDefaultBillingAddress = (addressObject: IAddressData) => {
    const disabledControlsAddressList = disableAddressListControls(addressInfo);
    const newAddressData = changeAddressListItem(disabledControlsAddressList, addressObject);
    setAddressInfo(newAddressData);
    setBillingIsDefaultControlList(newAddressData);
  };

  const handleSetDefaultShippingAddress = (addressObject: IAddressData) => {
    const disabledControlsAddressList = disableAddressListControls(addressInfo);
    const newAddressData = changeAddressListItem(disabledControlsAddressList, addressObject);
    setAddressInfo(newAddressData);
    setShippingIsDefaultControlList(newAddressData);
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
              {profileFormFields.map(({ name, ...data }) => (
                <TextField
                  {...data}
                  key={name}
                  isValid={!errors[name]}
                  helpText={errors[name]?.message}
                  {...register(name)}
                />
              ))}
            </div>
          </fieldset>
          <Address
            label={AddressActionName.BILLING}
            onEdit={handleChangeAddress}
            onAdd={handleAddAddress}
            onDelete={handleDeleteAddress}
            onSetSame={handleIsSame}
            onSetDefault={handleSetDefaultBillingAddress}
            isSameAddress={isSameAddress}
            addressList={addressInfo}
          />
          <Address
            label={AddressActionName.SHIPPING}
            onEdit={handleChangeAddress}
            onAdd={handleAddAddress}
            onDelete={handleDeleteAddress}
            onSetSame={handleIsSame}
            onSetDefault={handleSetDefaultShippingAddress}
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
