import React from 'react';
import { type IContributor } from './types';

interface ContributorProps {
  contributorData: IContributor;
}

export function Contributor({ contributorData }: ContributorProps) {
  const { image, name, role } = contributorData;
  return (
    <div className="contributor">
      <img className="contributor__image" src={image} alt="contributor" />
      <p className="contributor__name">{name}</p>
      <p className="contributor__role">{role}</p>
    </div>
  );
}
