import React, { type ComponentProps, forwardRef } from 'react';
import { ControlLabel } from 'components/UI/ControlLabel/ControlLabel';
import { RangeSlider } from '../RangeSlider/RangeSlider';
import { ReactComponent as ArrowDownIcon } from './assets/arrow-down-icon.svg';
import { type IFilterSettings } from '../Filter';
import { type IFilterRangeSlider, type IFilterList } from '../types';

export interface IFilterGroupProps extends Omit<ComponentProps<'div'>, 'onChange'> {
  title: string;
  rangeValues?: IFilterRangeSlider['rangeValues'];
  list?: IFilterList['list'];
  height?: number;
  filterSettings: IFilterSettings;
  className?: string;
  isExpand?: boolean;
  onSelect?: () => void;
  onChange: (data: IFilterSettings) => void;
}

export const FilterGroup = forwardRef<HTMLDivElement, IFilterGroupProps>(
  (
    {
      title,
      rangeValues,
      list,
      height,
      filterSettings,
      className,
      isExpand = false,
      onSelect,
      onChange,
    }: IFilterGroupProps,
    ref,
  ) => {
    return (
      <div
        className={`${className ?? ''} ${isExpand ? 'filter__group--expanded' : ''} filter__group`}
      >
        <p className="filter__group-title" onClick={onSelect}>
          {title}
          <ArrowDownIcon className="icon filter__expand-icon" />
        </p>
        <div className="filter__group-wrapper" style={{ height }}>
          <div ref={ref} className="filter__group-content">
            {rangeValues && (
              <RangeSlider
                {...rangeValues}
                onChange={(value) => {
                  onChange({
                    ...filterSettings,
                    [title]: { ...filterSettings?.[title], selectedValues: value },
                  });
                }}
              />
            )}
            {list && (
              <ul className="filter__group-options-list group-options">
                {list?.map((item) => (
                  <li key={item} className="filter__group-options-item">
                    <ControlLabel
                      checked={Boolean(filterSettings?.[title]?.[item])}
                      label={item}
                      onChange={(value) => {
                        onChange({
                          ...filterSettings,
                          [title]: { ...filterSettings?.[title], [item]: value },
                        });
                      }}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  },
);
