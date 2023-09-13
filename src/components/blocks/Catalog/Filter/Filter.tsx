import './style.scss';
import React, { type FC, useState } from 'react';
import { Button } from 'components/UI/Button/Button';
import { FilterAccordion } from './FilterAccordion/FilterAccordion';
import { type IFilterRangeSlider, type IFilterList } from './types';
import { type IFilters } from 'types/types';

// FETCH CATALOG DATA
const filterGroups: IFilterList[] = [
  // CALC FILTER CATEGORIES
  {
    title: 'size',
    list: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    title: 'category',
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
    title: 'brand',
    list: [
      'Cannondale',
      'Specialized',
      'Muddyfox',
      'Trek',
      'Cube',
      'Pinnacle',
      'GT',
      'Cosmic',
      'Raleigh',
      'Brompton',
    ],
  },
];

const rangeSliders: IFilterRangeSlider[] = [
  // CALC FILTER PRICE RANGE
  {
    title: 'price',
    rangeValues: {
      minLimit: 200,
      maxLimit: 5000,
    },
  },
];

export type IFilterSettings = Record<
  string,
  Record<string, boolean | { min: number; max: number }>
>;

interface IFilterProps {
  onHide: () => void;
  onSearch: (data: IFilters) => void;
  isShows: boolean;
}

export const Filter: FC<IFilterProps> = ({ onHide, onSearch, isShows }) => {
  const [filterSettings, setFilterSettings] = useState<IFilters>({});

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
          onChange={(data: IFilters) => {
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
