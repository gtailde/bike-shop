import { type ICustomer } from 'types/types';
import { type CustomerData } from '../types';

export type UserInfoEditProps = Partial<
  ICustomer & {
    dateOfBirth: string;
  }
> & {
  onBack: () => void;
  onSave: () => void;
  onChangeUserInfo: (customerData: CustomerData) => void;
};

export type UserInfoViewProps = Partial<ICustomer & { dateOfBirth: string; onEdit: () => void }>;

export interface UserInfoProps {
  onChangeUserInfo: (customerData: CustomerData) => void;
  userInfo?: Partial<ICustomer & { dateOfBirth: string }>;
}
