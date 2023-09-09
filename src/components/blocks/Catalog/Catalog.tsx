/* eslint-disable @typescript-eslint/no-floating-promises */
import './style.scss';
import React, { useEffect, useState } from 'react';
import { ProductCard } from './ProductCard/ProductCard';
import { Filter, type IFilterSettings } from './Filter/Filter';
import { TextField } from 'components/UI/TextField/TextField';
import { Select } from 'components/UI/Select/Select';
import { Button } from 'components/UI/Button/Button';
import { ReactComponent as FilterIcon } from './assets/filter-icon.svg';
import useDebounce from 'hooks/useDebounce';
import { CategoryNavigator } from 'components/UI/CategoryNavigator/CategoryNavigator';
import {
  type IProductVariantData,
  type IProductVariant,
  type IProductDetails,
  type ICategory,
} from 'types/types';
import productAPI from 'API/ProductAPI';

export const Catalog = () => {
  const [isFilterShows, setIsFilterShows] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [sortType, setSortType] = useState('name.en-US asc');
  const [searchResults, setSearchResults] = useState<IProductDetails[]>();
  const [filterSettings, setFilterSettings] = useState<IFilterSettings>({});

  const debouncedSearch = useDebounce((value: string) => {
    setDebouncedSearchQuery(value);
  }, 500);

  useEffect(() => {
    (async () => {
      const searchedProduct = (await productAPI.searchProduct(debouncedSearchQuery)).results;
      // const filteredProduct = await getFilteredProduct();
      // const product = searchedProduct.filter((sp) => filteredProduct.find((fp) => fp.id === sp.id));

      const resultProduct: IProductDetails[] = [];
      for (let i = 0; i < searchedProduct.length; i++) {
        resultProduct.push(await fetchProductData(searchedProduct[i].id));
      }

      setSearchResults(resultProduct);
      console.log(resultProduct);
    })();

    console.log({ debouncedSearchQuery, sortType, filterSettings });
  }, [debouncedSearchQuery, sortType, filterSettings]);

  // const getFilteredProduct = async () => {
  //   return await productAPI.getProductProjections({ brand: '', color: '' }, sortType);
  // };

  const handleSelectCategory = async (data: ICategory) => {
    const categoryProducts = (await productAPI.filter(data.id)).results;
    const products: Array<Promise<IProductDetails>> = [];
    for (let i = 0; i < categoryProducts.length; i++) {
      products.push(fetchProductData(categoryProducts[i].id));
    }
    setSearchResults(await Promise.all(products));
  };

  const fetchProductData = async (id: string | undefined) => {
    const result = await productAPI.getProduct(id ?? '');
    return await getProductDetails(result.masterData.current, result.id);
  };

  const getProductDetails = async (object: IProductVariantData, id: string) => {
    const variants = [...object.variants, object.masterVariant];

    const getCategoryNames = async (obj: IProductVariantData) => {
      const fetchedCategories = obj.categories.map(
        async (category) => await productAPI.getCategory(category.id),
      );
      const categories = await Promise.all(fetchedCategories);
      return categories.map((category) => category.name['en-US']).reverse();
    };

    const getSpecification = (obj: IProductVariantData) => {
      const srecObj = object.masterVariant.attributes.find((att) => att.name === 'Specification');
      return srecObj ? (typeof srecObj.value === 'string' ? srecObj.value : '') : '';
    };

    const getOptions = (productVariants: IProductVariant[]) => {
      const PUBLIC_OPTION_KEYS = ['Size', 'Color'];
      const options: Array<{ title: string; list: string[] }> = [];
      PUBLIC_OPTION_KEYS.forEach((key) => {
        const optionValues = productVariants
          .filter((variant) => variant.attributes.find((att) => att.name === key))
          .map((variant) => variant)
          .map((value) => value.attributes.find((att) => att.name === key)?.value);

        switch (key) {
          case 'Size':
            {
              const list: string[] = [];
              optionValues.map((value) => typeof value === 'object' && list.push(value.label));
              options.push({ title: key, list: Array.from(new Set(list.reverse())) });
            }
            break;
          case 'Color':
            {
              const list: string[] = [];
              optionValues.map((value) => typeof value === 'string' && list.push(value));
              options.push({ title: key, list: Array.from(new Set(list.reverse())) });
            }
            break;
        }
      });
      return options;
    };

    return {
      id,
      name: object.name['en-US'],
      categories: await getCategoryNames(object),
      titleImage: object.masterVariant.images[0].url,
      images: object.masterVariant.images.slice(1).map((img) => img.url),
      description: object.description['en-US'],
      specification: getSpecification(object),
      price:
        object.masterVariant.prices[0].value.centAmount /
        10 ** object.masterVariant.prices[0].value.fractionDigits,
      discountPrice: object.masterVariant.prices[0].discounted
        ? object.masterVariant.prices[0].discounted.value.centAmount /
          10 ** object.masterVariant.prices[0].discounted.value.fractionDigits
        : undefined,
      options: getOptions(variants),
    };
  };

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
              console.log(evt.target.value);
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
        <CategoryNavigator
          onSelect={async (data) => {
            await handleSelectCategory(data);
          }}
        />
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
