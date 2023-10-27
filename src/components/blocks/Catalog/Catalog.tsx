import './style.scss';
import React, { useEffect, useState } from 'react';
import { ProductCard } from './ProductCard/ProductCard';
import { Filter } from './Filter/Filter';
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
  type SortMethod,
  type SortType,
  type IFilters,
  type IProduct,
} from 'types/types';
import productAPI from 'API/ProductAPI';
import InfiniteScroll from 'react-infinite-scroll-component';
import { type CategoryName } from './Filter/types';

export const Catalog = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages] = useState(3);
  const [productLoadLimit] = useState(8);
  const [isFilterShows, setIsFilterShows] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [sortType, setSortType] = useState('name.en-US asc');
  const [products, setProducts] = useState<IProductDetails[]>([]);
  const [filterSettings, setFilterSettings] = useState<IFilters>({});

  const debouncedSearch = useDebounce((value: string) => {
    setDebouncedSearchQuery(value);
  }, 500);

  useEffect(() => {
    void (async () => {
      const requestOptions = getRequestOptions(productLoadLimit * pageNumber);
      const fetchedProduct = await getProduct(requestOptions);
      setProducts(fetchedProduct);
    })();
  }, [debouncedSearchQuery, sortType, filterSettings]);

  const getRequestOptions = (limit = productLoadLimit, offset = 0) => {
    const requestOptions: Parameters<typeof productAPI.getProductProjections> = [
      {
        ...filterSettings,
        searchText: debouncedSearchQuery,
      },
      {
        method: sortType.slice(0, sortType.indexOf(' ')) as SortMethod,
        type: sortType.slice(sortType.indexOf(' ')) as SortType,
      },
      limit,
      offset,
    ];
    return requestOptions;
  };

  const getProduct = async (
    requestOptions = getRequestOptions(productLoadLimit, productLoadLimit * pageNumber),
  ) => {
    const productProjections = (await productAPI.getProductProjections(...requestOptions)).results;
    const searchedProduct = await getDetailsFromReceivedProducts(productProjections);
    setProducts((prevProducts) => [...prevProducts, ...searchedProduct]);
    return searchedProduct;
  };

  const fetchProduct = async () => {
    const searchedProduct = await getProduct();
    setProducts([...products, ...searchedProduct]);
    setPageNumber(pageNumber + 1);
  };

  const handleSelectCategory = (data: ICategory, categoryName?: CategoryName) => {
    if (
      categoryName &&
      data.name['en-US'] !== 'Shop' &&
      data.name['en-US'] !== 'Bikes' &&
      data.name['en-US'] !== 'Brands'
    ) {
      setFilterSettings({
        [categoryName]: [categoryName === 'brand' ? data.name['en-US'] : data.id],
      });
    } else {
      setFilterSettings({});
    }
    setPageNumber(1);
  };

  const getDetailsFromReceivedProducts = async (receivedProduct: IProduct[]) => {
    const resultProduct: Array<Promise<IProductDetails>> = [];
    receivedProduct.forEach((product) => resultProduct.push(fetchProductData(product.id)));
    return Promise.all(resultProduct);
  };

  const fetchProductData = async (id: string | undefined) => {
    const result = await productAPI.getProduct(id ?? '', 'id');
    return await getProductDetails(result.masterData.current, result.id);
  };

  const getProductDetails = async (object: IProductVariantData, id: string) => {
    const variants = [...object.variants, object.masterVariant];

    const getCategoryNames = async (obj: IProductVariantData) => {
      const fetchedCategories = obj.categories.map(
        async (category) => await productAPI.getCategory(category.id, 'id'),
      );
      const categories = await Promise.all(fetchedCategories);
      return categories.map((category) => category.name['en-US']).reverse();
    };

    const getSpecification = (obj: IProductVariantData) => {
      const specObj = object.masterVariant.attributes.find((att) => att.name === 'Specification');
      return specObj ? (typeof specObj.value === 'string' ? specObj.value : '') : '';
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
        <CategoryNavigator onSelect={handleSelectCategory} />
        {
          <Filter
            onHide={() => {
              setIsFilterShows(!isFilterShows);
            }}
            onSearch={(settings) => {
              setPageNumber(1);
              setFilterSettings(settings);
            }}
            isShows={isFilterShows}
          />
        }
        <InfiniteScroll
          dataLength={products.length}
          next={fetchProduct}
          hasMore={pageNumber < totalPages}
          loader={<h4>Loading...</h4>}
          className="catalog__infinite-scroll-wrapper"
        >
          <div className="catalog__product-list">
            {products?.map((item) => <ProductCard key={item.id} {...item} />)}
          </div>
        </InfiniteScroll>
      </div>
    </section>
  );
};
