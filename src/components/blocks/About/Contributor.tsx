import React from 'react';
import { type IContributor } from './types';

export const Contributor = ({ image, name, role }: IContributor) => {
  return (
    <div className="contributor">
      <img className="contributor__image" src={image} alt="contributor" />
      <p className="contributor__name">{name}</p>
      <p className="contributor__role">{role}</p>
    </div>
  );
};
