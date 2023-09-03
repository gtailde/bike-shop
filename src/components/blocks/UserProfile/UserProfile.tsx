import './style.scss';
import React, { useEffect, useState } from 'react';
import { Address } from '../Address/Address';
import { type IAddressData } from '../Address/types';
import { UserInfo } from './UserInfo/UserInfo';
import { Form } from 'components/UI/Form/Form';
import { useParams } from 'react-router-dom';
import { getAddressInfo } from './helpers';
import { AddressSectionName } from './const';
import { type IAction, type IBaseAddress, type ICustomer } from 'types/types';
import { customerInfo } from './mock';

export const UserProfile = () => {
  const [profileInfo, setProfileInfo] = useState<ICustomer & { birthDate: Date }>();
  const [addressInfo, setAddressInfo] = useState<IAddressData[]>([]);
  const [isSameAddress, setIsSameAddress] = useState(false);
  const { id: userId } = useParams();

  const getCustomerData = () => {
    // fetching customer data...
    setTimeout(() => {
      setProfileInfo(customerInfo);

      const customerAddresses = getAddressInfo(customerInfo);
      setAddressInfo(customerAddresses);
    }, 1000);
  };

  useEffect(() => {
    getCustomerData();
  }, []);

  const handleChangeAddress = (addressObject: IAddressData) => {
    const actionObject: IAction & { address: Omit<IBaseAddress, 'id'>; addressId: string } = {
      action: 'changeAddress',
      addressId: addressObject.id ?? '',
      address: {
        key: addressObject.key,
        country: addressObject.country,
        streetName: addressObject.street,
        postalCode: addressObject.postalCode,
        city: addressObject.city,
        additionalAddressInfo: addressObject.title,
        // ... other props
      },
    };
    console.log('post change address data', actionObject); // await
    getCustomerData();
  };

  const handleAddAddress = (addressObject: IAddressData) => {
    const actionObject: IAction & { address: Omit<IBaseAddress, 'id'> } = {
      action: 'addAddress',
      address: {
        key: addressObject.key,
        country: addressObject.country,
        streetName: addressObject.street,
        postalCode: addressObject.postalCode,
        city: addressObject.city,
        additionalAddressInfo: addressObject.title,
        // ... other props
      },
    };
    console.log('post add address data', actionObject); // await
    getCustomerData();
  };

  const handleDeleteAddress = (addressObject: IAddressData) => {
    const actionObject: IAction & { addressId: string } = {
      action: 'removeAddress',
      addressId: addressObject.id ?? '-1',
    };
    console.log('post remove address data', actionObject); // await
    getCustomerData();
  };

  const handleIsSame = (value: boolean) => {
    setIsSameAddress(value);
  };

  const handleSetDefaultBilling = (addressObject: IAddressData) => {
    const actionObject: IAction & { addressId: string } = {
      action: 'setDefaultBillingAddress',
      addressId: addressObject.id ?? '',
    };
    console.log('post change default billing address data', actionObject); // await
    getCustomerData();
  };

  const handleSetDefaultShipping = (addressObject: IAddressData) => {
    const actionObject: IAction & { addressId: string } = {
      action: 'setDefaultShippingAddress',
      addressId: addressObject.id ?? '',
    };
    console.log('post change default shipping address data', actionObject); // await
    getCustomerData();
  };

  return (
    <section className="user-profile">
      <div className="user-profile__content page-wrapper">
        <h2 className="user-profile__title">User info</h2>
        <p className="dinamic-address">
          {'dinamic-address-params-user-id: ' + JSON.stringify(userId)}
        </p>
        <Form>
          <UserInfo {...profileInfo} />
          <Address
            label={AddressSectionName.BILLING}
            onEdit={handleChangeAddress}
            onAdd={handleAddAddress}
            onDelete={handleDeleteAddress}
            onSetSame={handleIsSame}
            onSetDefault={handleSetDefaultBilling}
            isSameAddress={isSameAddress}
            addressList={addressInfo}
          />
          <Address
            label={AddressSectionName.SHIPPING}
            onEdit={handleChangeAddress}
            onAdd={handleAddAddress}
            onDelete={handleDeleteAddress}
            onSetSame={handleIsSame}
            onSetDefault={handleSetDefaultShipping}
            isSameAddress={isSameAddress}
            addressList={addressInfo}
          />
        </Form>
      </div>
    </section>
  );
};
