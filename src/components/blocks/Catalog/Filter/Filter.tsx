import './style.scss';
import React, { type FC, useState } from 'react';
import { Button } from 'components/UI/Button/Button';
import { FilterAccordion } from './FilterAccordion/FilterAccordion';
import { type IFilterRangeSlider, type IFilterList } from './types';

// FETCH CATALOG DATA
const filterGroups: IFilterList[] = [
  // CALC FILTER CATEGORIES
  {
    title: 'Size',
    list: ['S', 'M', 'L', 'XL'],
  },
  {
    title: 'Category',
    list: [
      'Road Bikes',
      'Hybrid Bikes',
      'Mountain Bikes',
      'Gravel Bikes',
      "Kids' Bikes",
      'Touring Bikes',
      'Electric Bikes',
      'Folding Bikes',
      'BMX Bikes',
    ],
  },
  {
    title: 'Brand',
    list: ['BMC', 'Burgtec', 'Cannondale', 'Castelli', 'Cervelo'],
  },
];

const rangeSliders: IFilterRangeSlider[] = [
  // CALC FILTER PRICE RANGE
  {
    title: 'Price',
    rangeValues: {
      minLimit: 3540,
      maxLimit: 9870,
    },
  },
];

export type IFilterSettings = Record<
  string,
  Record<string, boolean | { min: number; max: number }>
>;

interface IFilterProps {
  onHide: () => void;
  onSearch: (data: IFilterSettings) => void;
  isShows: boolean;
}

export const Filter: FC<IFilterProps> = ({ onHide, onSearch, isShows }) => {
  const [filterSettings, setFilterSettings] = useState<IFilterSettings>({});

  return (
    <div className={`catalog__filter filter ${isShows ? 'filter--show' : ''}`}>
      <div className="filter__content">
        <div className="filter__headline">
          <h3 className="filter__title">Filters</h3>
          <Button className="button button--wo-borders" onClick={onHide}>
            Hide
          </Button>
        </div>
        <FilterAccordion
          rangeSliders={rangeSliders}
          controlGroups={filterGroups}
          onChange={(data: IFilterSettings) => {
            setFilterSettings(data);
          }}
          filterSettings={filterSettings}
        />
        <div className="filter__button-group">
          <Button
            className="form__button"
            accent
            onClick={() => {
              onSearch(filterSettings);
            }}
          >
            Search
          </Button>
          <Button
            className="form__button"
            onClick={() => {
              setFilterSettings({});
            }}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};
