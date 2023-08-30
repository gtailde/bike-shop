import './style.scss';
import React, { useState } from 'react';
import { Address } from '../Address/Address';
import { type IAddressData } from '../Address/types';
import { UserInfo } from './UserInfo/UserInfo';
import { Form } from 'components/UI/Form/Form';
import { useParams } from 'react-router-dom';
import { getAddressInfo } from './helpers';
import { AddressSectionName } from './const';
import { type ICustomer } from 'types/types';

interface IMockCustomer
  extends Pick<
    ICustomer,
    | 'firstName'
    | 'lastName'
    | 'email'
    | 'addresses'
    | 'billingAddressIds'
    | 'shippingAddressIds'
    | 'defaultBillingAddressId'
    | 'defaultShippingAddressId'
  > {
  birthDate: string;
}

const customerInfo: IMockCustomer = {
  firstName: 'John',
  lastName: 'Doe',
  billingAddressIds: ['10001', '10547'],
  shippingAddressIds: ['10777'],
  defaultBillingAddressId: '10001',
  defaultShippingAddressId: '10777',
  email: 'john-doe@mail.com',
  birthDate: '2003-08-25T10:23:03Z',
  addresses: [
    {
      id: '10001',
      key: '478949584758',
      country: 'DE',
      streetName: 'Random-street',
      postalCode: '156788',
      city: 'Random-City',
      additionalAddressInfo: 'Home',
    },
    {
      id: '10547',
      key: '428948784798',
      country: 'AU',
      streetName: 'Random-street',
      postalCode: '165798',
      city: 'Random-City',
      additionalAddressInfo: 'Office',
    },
    {
      id: '10777',
      key: '478238784798',
      country: 'US',
      streetName: 'Random-street',
      postalCode: '454378',
      city: 'Random-City',
      additionalAddressInfo: 'Work',
    },
  ],
};

const customerAddresses = getAddressInfo(customerInfo);

export const UserProfile = () => {
  const [addressInfo, setAddressInfo] = useState<IAddressData[]>(customerAddresses);
  const [isSameAddress, setIsSameAddress] = useState(false);
  const { id: userId } = useParams();

  const [billingIsDefaultControlList, setBillingIsDefaultControlList] = useState<IAddressData[]>(
    [],
  );
  const [shippingIsDefaultControlList, setShippingIsDefaultControlList] = useState<IAddressData[]>(
    [],
  );

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
    <section className="user-profile">
      <div className="user-profile__content page-wrapper">
        <h2 className="user-profile__title">User info</h2>
        <p className="dinamic-address">
          {'dinamic-address-params-user-id: ' + JSON.stringify(userId)}
        </p>
        <Form>
          <UserInfo {...customerInfo} />
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
      </div>
    </section>
  );
};
