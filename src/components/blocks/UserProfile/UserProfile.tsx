import './style.scss';
import React, { useState } from 'react';
import { Address } from '../Address/Address';
import { type IAddressData } from '../Address/types';
import { UserInfo } from './UserInfo/UserInfo';
import { Form } from 'components/UI/Form/Form';
import { useParams } from 'react-router-dom';

const AddressSectionName = {
  BILLING: 'Billing Address',
  SHIPPING: 'Shipping Address',
};

const customerInfo = {
  firstName: 'John',
  lastName: 'Doe',
  billingAddressIds: [],
  shippingAddressIds: [],
  email: 'john-doe@mail.com',
  birthDate: '2003-08-25T10:23:03Z',
};

export const UserProfile = () => {
  const [addressInfo, setAddressInfo] = useState<IAddressData[]>([]);
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
