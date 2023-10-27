import React, { type ComponentProps, forwardRef } from 'react';
import { ControlLabel } from 'components/UI/ControlLabel/ControlLabel';
import { RangeSlider } from '../RangeSlider/RangeSlider';
import { ReactComponent as ArrowDownIcon } from './assets/arrow-down-icon.svg';
import { type IFilterRangeSlider, type IFilterOption } from '../types';
import { type IFilters } from 'types/types';

export interface IFilterGroupProps extends Omit<ComponentProps<'div'>, 'onChange'> {
  title: string;
  rangeValues?: IFilterRangeSlider['rangeValues'];
  list?: IFilterOption['list'];
  IDs?: string[]; // for categories IDs
  height?: number;
  filterSettings: IFilters;
  className?: string;
  isExpand?: boolean;
  onSelect?: () => void;
  onChange: (data: IFilters) => void;
}

export const FilterGroup = forwardRef<HTMLDivElement, IFilterGroupProps>(
  (
    {
      title,
      rangeValues,
      list,
      IDs,
      height,
      filterSettings,
      className,
      isExpand = false,
      onSelect,
      onChange,
    }: IFilterGroupProps,
    ref,
  ) => {
    const onChangeFilter = (value: boolean, item: string) => {
      const currentFilter = filterSettings[title as keyof Omit<IFilters, 'price'>] ?? [];
      const filters = {
        ...filterSettings,
        [title]: currentFilter,
      };

      if (value) currentFilter?.push(item);
      else
        currentFilter?.splice(
          currentFilter.findIndex((elem) => elem === item),
          1,
        );

      onChange(filters);
    };

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
                    [title]: value,
                  });
                }}
              />
            )}
            {list && (
              <ul className="filter__group-options-list group-options">
                {list?.map((item, index) => (
                  <li key={item} className="filter__group-options-item">
                    <ControlLabel
                      checked={Boolean(
                        filterSettings?.[title as keyof Omit<IFilters, 'price'>]?.find(
                          (elem) => elem === (IDs?.[index] ?? item),
                        ),
                      )}
                      label={item}
                      onChange={(value) => {
                        onChangeFilter(value, IDs?.[index] ?? item);
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
