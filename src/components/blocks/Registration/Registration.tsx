import './style.scss';
import React, { useState } from 'react';
import { ProfileInfo } from './ProfileInfo/ProfileInfo';
import { Address } from './Address/Address';
import { type IAddressData, type IProfileInfo } from './types';
import { Button } from 'components/UI/Button/Button';
import { Link } from 'react-router-dom';
import { pagePathnames } from 'router/pagePathnames';

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
  SHIPPTING: 'Shipping Address',
};

export const Registration = () => {
  const [profileInfo, setProfileInfo] = useState({});
  const [addressInfo, setAddressInfo] = useState([] as IAddressData[]);
  const [isSameAddress, setIsSameAddress] = useState(false);

  const handleSubmit = () => {
    const billingInfo = addressInfo.filter(
      (address) => address.source === AddressSectionName.BILLING,
    );
    const shippingInfo = addressInfo.filter(
      (address) => address.source === AddressSectionName.SHIPPTING,
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

  return (
    <section className="registration">
      <div className="registration__container page-wrapper">
        <header className="registration__header">
          <h2 className="visually-hidden">Registration form</h2>
          <p className="registration__title">Sign up</p>
          <p className="registration__description">Please sign up below</p>
        </header>
        <form action="" className="registration__form form" id="443">
          <ProfileInfo onChange={handleProfileInfoInput} />
          <Address
            label={AddressSectionName.BILLING}
            onEdit={handleChangeAddress}
            onSetSame={handleIsSame}
            isSameAddress={isSameAddress}
            addressList={addressInfo}
            onSubmit={() => {
              console.log('submit!');
            }}
          />
          <Address
            label={AddressSectionName.SHIPPTING}
            onEdit={handleChangeAddress}
            onSetSame={handleIsSame}
            isSameAddress={isSameAddress}
            addressList={addressInfo}
          />
        </form>
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
