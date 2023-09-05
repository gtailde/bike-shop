import './style.scss';
import React, { useEffect, useState } from 'react';
import { Address } from '../Address/Address';
import { type IAddressData } from '../Address/types';
import { UserInfo } from './UserInfo/UserInfo';
import { Form } from 'components/UI/Form/Form';
import { useParams } from 'react-router-dom';
import { getAddressInfo } from './helpers';
import { AddressActionName } from '../../../const';
import { type IAction, type IBaseAddress, type ICustomer } from 'types/types';
import { UserPassword } from './UserPassword/UserPassword';
import { customersApi } from 'API/CustomersAPI';
import { updateCustomersAPI } from 'API/UpdateCustomerAPI';
import { type CustomerData } from './types';

export const UserProfile = () => {
  const [profileInfo, setProfileInfo] = useState<ICustomer & { dateOfBirth: string }>();
  const [addressInfo, setAddressInfo] = useState<IAddressData[]>([]);
  const { id: userId } = useParams();

  useEffect(() => {
    void getCustomerData();
  }, []);

  const getCustomerData = async () => {
    const customer = await customersApi.getCustomer();
    if ('id' in customer) {
      setProfileInfo(customer);
      setAddressInfo(getAddressInfo(customer));
      console.log(customer);
    }
  };

  const updateCustomerData = async (customerData: CustomerData) => {
    await updateCustomersAPI.setEmail(customerData.email);
    await updateCustomersAPI.setFirstName(customerData.firstName);
    await updateCustomersAPI.setLastName(customerData.lastName);
    await updateCustomersAPI.setDateOfBirth(customerData.dateOfBirth as unknown as string);
    void getCustomerData();
  };

  const handleChangeAddress = async (addressObject: IAddressData) => {
    const actionObject: IAction & { address: Omit<IBaseAddress, 'id'>; addressId: string } = {
      action: 'changeAddress',
      addressId: addressObject.id ?? '',
      address: {
        key: addressObject.key,
        country: addressObject.country.toUpperCase(),
        streetName: addressObject.streetName,
        postalCode: addressObject.postalCode,
        city: addressObject.city,
        title: addressObject.title,
      },
    };
    await updateCustomersAPI.changeAddress(actionObject.address, actionObject.addressId);
    void getCustomerData();
  };

  const handleAddAddress = async (addressObject: IAddressData) => {
    const actionObject: IAction & { address: Omit<IBaseAddress, 'id'> } = {
      action: 'addAddress',
      address: {
        key: addressObject.key,
        country: addressObject.country,
        streetName: addressObject.streetName,
        postalCode: addressObject.postalCode,
        city: addressObject.city,
        title: addressObject.title,
      },
    };
    await updateCustomersAPI.addAddressId(addressObject.source, actionObject.address);
    void getCustomerData();
  };

  const handleDeleteAddress = async (addressObject: IAddressData) => {
    const actionObject: IAction & { addressId: string } = {
      action: 'removeAddress',
      addressId: addressObject.id ?? '-1',
    };
    await updateCustomersAPI.removeAddress(actionObject.addressId);
    void getCustomerData();
  };

  const handleSetDefaultBilling = (addressObject: IAddressData) => {
    const actionObject: IAction & { addressId: string } = {
      action: 'setDefaultBillingAddress',
      addressId: addressObject.id ?? '',
    };
    void getCustomerData();
  };

  const handleSetDefaultShipping = (addressObject: IAddressData) => {
    const actionObject: IAction & { addressId: string } = {
      action: 'setDefaultShippingAddress',
      addressId: addressObject.id ?? '',
    };
    void getCustomerData();
  };

  return (
    <section className="user-profile">
      <div className="user-profile__content page-wrapper">
        <h2 className="user-profile__title">User info</h2>
        <p className="dinamic-address">
          {'dinamic-address-params-user-id: ' + JSON.stringify(userId)}
        </p>
        <Form>
          <UserInfo userInfo={profileInfo ?? {}} onChangeUserInfo={updateCustomerData} />
          <UserPassword />
          <Address
            label={AddressActionName.BILLING}
            onEdit={handleChangeAddress}
            onAdd={handleAddAddress}
            onDelete={handleDeleteAddress}
            onSetDefault={handleSetDefaultBilling}
            addressList={addressInfo}
          />
          <Address
            label={AddressActionName.SHIPPING}
            onEdit={handleChangeAddress}
            onAdd={handleAddAddress}
            onDelete={handleDeleteAddress}
            onSetDefault={handleSetDefaultShipping}
            addressList={addressInfo}
          />
        </Form>
      </div>
    </section>
  );
};
