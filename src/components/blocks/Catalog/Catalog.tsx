import './style.scss';
import React, { useEffect, useState } from 'react';
import { ProductCard } from './ProductCard/ProductCard';
import { Filter, type IFilterSettings } from './Filter/Filter';
import { TextField } from 'components/UI/TextField/TextField';
import { Select } from 'components/UI/Select/Select';
import { Button } from 'components/UI/Button/Button';
import { ReactComponent as FilterIcon } from './assets/filter-icon.svg';
import { getMockProductList } from './mocks';
import { type IProductData } from './Filter/types';
import useDebounce from 'hooks/useDebounce';

export const Catalog = () => {
  const [isFilterShows, setIsFilterShows] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [sortType, setSortType] = useState('none');
  const [searchResults, setSearchResults] = useState<IProductData[]>();
  const [filterSettings, setFilterSettings] = useState<IFilterSettings>({});

  const debouncedSearch = useDebounce((value: string) => {
    setDebouncedSearchQuery(value);
  }, 500);

  useEffect(() => {
    // FETCHING NEW PRODUCT LIST WITH FILTER SETTINGS:
    console.log({ debouncedSearchQuery, sortType, filterSettings });
    setTimeout(() => {
      setSearchResults(getMockProductList(20));
    }, 300);
  }, [debouncedSearchQuery, sortType, filterSettings]);

  return (
    <section className="catalog">
      <div className="catalog__content page-wrapper">
        <h2 className="catalog__title">Catalog</h2>
        <div className="catalog__headline">
          <TextField
            label="Search"
            name="search"
            type="search"
            className="catalog__search-field"
            value={searchQuery}
            onChange={(evt) => {
              setSearchQuery(evt.target.value);
              debouncedSearch(evt.target.value);
            }}
          />
          <Select
            className="catalog__select-field"
            value={sortType}
            onChange={(evt) => {
              setSortType(evt.target.value);
            }}
          />
          <Button
            className="catalog__headline-button"
            onClick={() => {
              setIsFilterShows(!isFilterShows);
            }}
          >
            <FilterIcon className="icon" />
            filter
          </Button>
        </div>
        {
          <Filter
            onHide={() => {
              setIsFilterShows(!isFilterShows);
            }}
            onSearch={(settings) => {
              setFilterSettings(settings);
            }}
            isShows={isFilterShows}
          />
        }
        <div className="catalog__product-list">
          {searchResults ? (
            searchResults.map((item, index) => <ProductCard key={index} {...item} />)
          ) : (
            <div className="catalog__loading">Loading...</div>
          )}
        </div>
      </div>
    </section>
  );
};
