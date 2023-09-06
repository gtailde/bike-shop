import './style.scss';
import React, { useEffect, useState } from 'react';
import { Address } from '../Address/Address';
import { type IAddressData } from '../Address/types';
import { UserInfo } from './UserInfo/UserInfo';
import { Form } from 'components/UI/Form/Form';
import { useParams } from 'react-router-dom';
import { extractBaseAddressFromAddressData, getAddressInfo } from './helpers';
import { AddressActionName } from '../../../const';
import { type ICustomer, type IErrorResponse } from 'types/types';
import { UserPassword } from './UserPassword/UserPassword';
import { customersApi } from 'API/CustomersAPI';
import { updateCustomersAPI } from 'API/UpdateCustomerAPI';
import { type CustomerData } from './types';
import { successNotify } from 'Notifiers';

export const UserProfile = () => {
  const [profileInfo, setProfileInfo] = useState<ICustomer & { dateOfBirth: string }>();
  const [addressInfo, setAddressInfo] = useState<IAddressData[]>([]);
  const { id: userId } = useParams();

  useEffect(() => {
    void getCustomerData();
  }, []);

  const getCustomerData = async () => {
    const customer = await customersApi.getCustomer();
    setCustomerDataState(customer);
  };

  const setCustomerDataState = (customer: ICustomer | IErrorResponse) => {
    if ('id' in customer) {
      setProfileInfo(customer);
      setAddressInfo(getAddressInfo(customer));
    }
  };

  const updateCustomerData = async (customerData: CustomerData) => {
    const results = [
      await updateCustomersAPI.setEmail(customerData.email),
      await updateCustomersAPI.setFirstName(customerData.firstName),
      await updateCustomersAPI.setLastName(customerData.lastName),
      await updateCustomersAPI.setDateOfBirth(customerData.dateOfBirth as unknown as string),
    ];
    if (!results.some((res) => res === null)) {
      void getCustomerData();
      successNotify('Your personal information successfully changed!');
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    const customer = await updateCustomersAPI.changePassword(currentPassword, newPassword);
    if (customer) {
      setProfileInfo(customer);
      successNotify('Your password successfully changed!');
    }
  };

  const handleChangeAddress = async (addressObject: IAddressData) => {
    const customer = await updateCustomersAPI.changeAddress(
      extractBaseAddressFromAddressData(addressObject),
      addressObject.id ?? '',
    );
    if (typeof customer !== 'string') setCustomerDataState(customer);
  };

  const handleAddAddress = async (addressObject: IAddressData) => {
    const customer = await updateCustomersAPI.addAddressId(
      addressObject.source,
      extractBaseAddressFromAddressData(addressObject),
    );
    if (customer) setCustomerDataState(customer);
  };

  const handleDeleteAddress = async (addressObject: IAddressData) => {
    const customer = await updateCustomersAPI.removeAddress(addressObject.id ?? '');
    if (customer) setCustomerDataState(customer);
  };

  const handleSetDefaultBilling = async (addressObject: IAddressData) => {
    const customer = await updateCustomersAPI.addAddressId(
      AddressActionName.BILLING_DEFAULT,
      '',
      addressObject.id,
    );
    if (customer) setCustomerDataState(customer);
  };

  const handleSetDefaultShipping = async (addressObject: IAddressData) => {
    const customer = await updateCustomersAPI.addAddressId(
      AddressActionName.SHIPPING_DEFAULT,
      '',
      addressObject.id,
    );
    if (customer) setCustomerDataState(customer);
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
          <UserPassword onChangePassword={changePassword} />
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
