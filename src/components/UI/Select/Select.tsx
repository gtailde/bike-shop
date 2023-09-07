import './style.scss';
import React, { type FC, type ComponentProps } from 'react';
import { ReactComponent as ArrowDownIcon } from './assets/arrow-down-icon.svg';
import { ReactComponent as SortIcon } from './assets/sort-icon.svg';

export const Select: FC<ComponentProps<'select'>> = ({ className, ...props }) => {
  return (
    <div className={`${className ?? ''} select`}>
      <select {...props}>
        <option value="none" disabled>
          Sort by:
        </option>
        {/* <option value="masterVariant.prices[0].value.centAmount">Price ↑</option>
        <option value="masterVariant.prices[0].value.centAmount">Price ↓</option> */}
        <option value="name.en-US asc">Name ↑</option>
        <option value="name.en-US desc">Name ↓</option>
      </select>
      <div className="select__icon-container select__icon-container--left">
        <SortIcon className="icon" />
      </div>
      <div className="select__icon-container">
        <ArrowDownIcon className="icon" />
      </div>
    </div>
  );
};
