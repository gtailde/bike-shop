import React, { type ReactNode, type FC } from 'react';
import './style.scss';

export interface Props extends Omit<Partial<HTMLDivElement>, 'children'> {
  isOpened: boolean;
  onClose: () => void;
  children: ReactNode | undefined;
}

export const NavPopup: FC<Props> = ({ isOpened, onClose, children }) => {
  return (
    isOpened && (
      <div className="popup">
        <div className="nav-popup__overlay" onClick={onClose}></div>
        <section className="nav-popup">{children}</section>
      </div>
    )
  );
};
