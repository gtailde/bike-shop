import './style.scss';
import React, { type FC } from 'react';
import { ReactComponent as ArrowIcon } from './assets/arrow-down-icon.svg';
import { type ICategory } from 'types/types';

interface IBreadcrumbsProps {
  categoryPathArray: ICategory[];
  onSelect: (data: ICategory) => void;
}

export const Breadcrumbs: FC<IBreadcrumbsProps> = ({ categoryPathArray, onSelect }) => {
  return (
    <ul className="breadscrumbs">
      {categoryPathArray?.map((category, index) => (
        <li
          key={`${category.id}_${index}`}
          className="breadscrumbs__item"
          onClick={() => {
            onSelect(category);
          }}
        >
          {category.name['en-US']}
          {index < categoryPathArray.length - 1 && (
            <ArrowIcon className="breadscrumbs__icon icon" />
          )}
        </li>
      ))}
    </ul>
  );
};
