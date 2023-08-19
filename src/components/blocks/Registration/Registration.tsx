import './style.scss';
import React, { useState } from 'react';
import { ProfileInfo } from './ProfileInfo/ProfileInfo';
import { Address } from './Address/Address';
import { type IAddressData, type IProfileInfo } from './types';
import { Button } from 'components/UI/Button/Button';
import { Form } from 'components/UI/Form/Form';
import { Link } from 'react-router-dom';
import { pagePathnames } from 'router/pagePathnames';
import { getAddressesForPost } from './helpers';

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
  const [profileInfo, setProfileInfo] = useState({});
  const [addressInfo, setAddressInfo] = useState([] as IAddressData[]);
  const [isSameAddress, setIsSameAddress] = useState(false);
  const [billingIsDefaultControlList, setBillingIsDefaultControlList] = useState(
    [] as IAddressData[],
  );
  const [shippingIsDefaultControlList, setShippingIsDefaultControlList] = useState(
    [] as IAddressData[],
  );

  const handleSubmit = () => {
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
  };
  const handleProfileInfoInput = (data: IProfileInfo) => {
    setProfileInfo(data);
  };
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
        <Form className="registration__form form">
          <ProfileInfo onChange={handleProfileInfoInput} />
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
        <Button type="submit" accent onClick={handleSubmit}>
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
