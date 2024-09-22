import './style.scss';
import React, { useEffect, useState } from 'react';
import { Button } from 'components/UI/Button/Button';
import { useParams } from 'react-router-dom';
import { ProductDetailsOption } from './ProductDetailsOption';
import { ProductSlider } from './ProductSlider';
import { Accordion } from 'components/UI/Accordion/Accordion';
import { Counter } from 'components/UI/Counter/Counter';
import productAPI from 'API/ProductAPI';
import { type IProductVariantData, type IProductVariant } from 'types/types';
import { Price } from 'components/UI/Price/Price';
import { transformPriceText } from '../Catalog/ProductCard/helpers';

interface IProductDetails {
  name: string;
  categories: string[];
  titleImage: string;
  images: string[];
  description: string;
  specification: string;
  price: number;
  discountPrice?: number;
  options: Array<{ title: string; list: string[] }>;
}

export const ProductDetails = () => {
  const [productData, setProductData] = useState<IProductDetails>();
  const params = useParams();
  useEffect(() => {
    void fetchProductData(params.id);
  }, [params.id]);

  const fetchProductData = async (id: string | undefined) => {
    if (id) {
      const result = await productAPI.getProduct(id);
      const productDetailObject = await getProductDetails(result.masterData.current);
      console.log(productDetailObject);
      setProductData(productDetailObject);
    } else {
      throw Error('product data not fetched');
    }
  };

  const getProductDetails = async (object: IProductVariantData) => {
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
    productData && (
      <section className="product-details">
        <div className="product-details__content page-wrapper">
          <div style={{ display: 'none' }} className="product">{`Product details [id]: ${
            params.id ?? ''
          }`}</div>
          <h2 className="product-details__title visually-hidden">Product-details</h2>
          <ProductSlider images={[productData.titleImage, ...productData.images]} />
          <div className="product-details__options">
            <p className="product-details__headline">
              <span className="product-details__name">{productData.name}</span>
              <span className="product-details__category">{productData.categories.join(' ')}</span>
            </p>
            <Price
              className="product-details__price"
              price={productData.price}
              discountPrice={productData.discountPrice}
              formatter={transformPriceText}
            />
            {productData.options.map((option, index) => (
              <ProductDetailsOption key={`${option.title}_${index}`} data={option} />
            ))}
            <div className="product-details__basket-controls">
              <Counter className="product-details__counter" />
              <Button accent>Add to Basket</Button>
            </div>
          </div>
          <Accordion
            className="product-details__accordion"
            contents={[
              { title: 'Description', content: productData.description },
              { title: 'Specification', content: productData.specification },
            ]}
          ></Accordion>
        </div>
      </section>
    )
  );
};
