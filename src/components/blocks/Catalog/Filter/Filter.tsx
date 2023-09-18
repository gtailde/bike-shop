import './style.scss';
import React, { type FC, useState, useEffect } from 'react';
import { Button } from 'components/UI/Button/Button';
import { FilterAccordion } from './FilterAccordion/FilterAccordion';
import { type IFilterRangeSlider, type IFilterOption } from './types';
import { type IFilters } from 'types/types';
import productAPI from 'API/ProductAPI';

const rangeSliders: IFilterRangeSlider[] = [
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
  const [filterGroups, setFilterGroups] = useState<IFilterOption[]>([
    {
      title: 'size',
      list: ['XS', 'S', 'M', 'L', 'XL'],
    },
  ]);

  useEffect(() => {
    void (async () => {
      const response = await productAPI.getCategories();
      const bikeCategories = response.results;
      setFilterGroups((prev) => [
        ...prev,
        {
          title: 'category',
          list: [...bikeCategories.slice(0, 8).map((category) => category.name['en-US'])],
          IDs: [...bikeCategories.slice(0, 8).map((category) => category.id)],
        },
        {
          title: 'brand',
          list: [...bikeCategories.slice(8, 20).map((category) => category.name['en-US'])].filter(
            (category) => !['Brands', 'Bikes'].includes(category),
          ),
        },
      ]);
    })();
  }, []);

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
