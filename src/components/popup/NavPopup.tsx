import React, { type ReactNode, type FC, useEffect, useRef } from 'react';
import './style.scss';

export interface Props extends Omit<Partial<HTMLDivElement>, 'children'> {
  isOpened: boolean;
  onClose: () => void;
  children: ReactNode | undefined;
}

export const NavPopup: FC<Props> = ({ isOpened, onClose, children }) => {
  const popupRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const userNavigation = document.querySelector('.page-header__user-navigation') as HTMLElement;
    const setPosition = () => {
      const positionTop = userNavigation.offsetTop + userNavigation.offsetHeight;
      const positionLeft = userNavigation.offsetLeft;
      if (popupRef.current) {
        popupRef.current.style.top = `${positionTop}px`;
        popupRef.current.style.left = `${positionLeft}px`;
      }
    };

    setPosition();

    window.addEventListener('resize', setPosition);

    return () => {
      window.removeEventListener('resize', setPosition);
    };
  }, [isOpened]);

  return (
    isOpened && (
      <div className="popup">
        <div className="popup__overlay" onClick={onClose}></div>
        <section ref={popupRef} className="nav-popup">
          {children}
        </section>
      </div>
    )
  );
};
