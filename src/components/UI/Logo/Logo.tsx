import './style.scss';

import React from 'react';
import { ReactComponent as LogoImage } from './assets/logo.svg';
import { ReactComponent as LogoRss } from './assets/logo-rss.svg';
import { ReactComponent as LogoText } from './assets/logo-text.svg';

export const Logo = ({ className }: { className?: string }) => {
  return (
    <span className={`logo ${className ?? ''}`}>
      <LogoImage className="logo__image" />
      <LogoRss className="logo__rss" />
      <LogoText className="logo__text" />
    </span>
  );
};
