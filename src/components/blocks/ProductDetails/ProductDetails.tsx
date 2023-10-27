import './style.scss';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'components/UI/Button/Button';
import { useParams } from 'react-router-dom';
import { ProductDetailsOption } from './ProductDetailsOption';
import { ProductSlider } from './ProductSlider';
import { Accordion } from 'components/UI/Accordion/Accordion';
import { Counter } from 'components/UI/Counter/Counter';
import productAPI from 'API/ProductAPI';
import { type IProductVariantData, type IProductVariant, type IProduct } from 'types/types';
import { Price } from 'components/UI/Price/Price';
import { transformPriceText } from '../../../helpers/formatText';
import basketAPI from 'API/BasketAPI';
import { UserContext } from 'store/userContext';

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
  const { cart, setCart } = useContext(UserContext);
  const [productData, setProductData] = useState<IProductDetails>();
  const [productQuantity, setProductQuantity] = useState(1);
  const [commersetoolsProductData, setCommersetoolsProductData] = useState<IProduct>();
  const selectedOptions = new Map<string, string>();
  const [enabledOptions, setEnabledOptions] = useState<Record<string, string[]>>();
  const [selectedVariant, setSelectedVariant] = useState<IProductVariant>();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const params = useParams();

  useEffect(() => {
    void fetchProductData(params.id);
  }, [params.id]);

  useEffect(() => {
    setIsProductInCart(!!checkProductAvailabilityInCart());
  }, [cart]);

  const checkProductAvailabilityInCart = () =>
    cart?.lineItems.find((item) => item.productId === params.id);

  const fetchProductData = async (id: string | undefined) => {
    if (id) {
      const result = await productAPI.getProduct(id, 'id');
      setCommersetoolsProductData(result);
      const productDetailObject = await getProductDetails(result.masterData.current);
      setProductData(productDetailObject);
    } else {
      throw Error('product data not fetched');
    }
  };

  const getProductDetails = async (object: IProductVariantData) => {
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

  const handleAddItemToCart = async () => {
    if (!commersetoolsProductData) {
      return;
    }

    const productVariantId = selectedVariant?.id;

    const newCart = await basketAPI.addToCart(
      params.id ?? '',
      productVariantId ?? 1,
      productQuantity,
    );
    if (newCart) setCart?.(newCart);
  };

  const handleOptionSelect = (evt: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    if (!commersetoolsProductData) {
      return;
    }

    const radioButton = evt.currentTarget;
    if (selectedOptions.get(radioButton.name) === radioButton.value) {
      radioButton.checked = false;
      selectedOptions.delete(radioButton.name);
    } else {
      selectedOptions.set(radioButton.name, radioButton.value);
    }

    const enabledOptionsList: Record<string, string[]> = {};
    const productVatiants = [
      commersetoolsProductData.masterData.current.masterVariant,
      ...commersetoolsProductData.masterData.current.variants,
    ];

    const matchedVariant = Array.from(selectedOptions.keys()).reduce((result, option) => {
      return result.filter((variant) =>
        variant.attributes.some((att) => {
          const value = typeof att.value === 'object' ? att.value.label : att.value;
          return att.name === option && value === selectedOptions.get(option);
        }),
      );
    }, productVatiants)[0];

    setSelectedVariant(matchedVariant);

    Array.from(selectedOptions.keys()).forEach((key) => {
      const optionValue = selectedOptions.get(key);
      const matchedProductVariants = productVatiants.filter((variant) => {
        return variant.attributes.some((att) => {
          if (att.name === key) {
            const value = typeof att.value === 'object' ? att.value.label : att.value;
            return value === optionValue;
          }
          return false;
        });
      });

      matchedProductVariants.forEach((variant) => {
        variant.attributes.forEach((att) => {
          if (att.name !== key) {
            if (!enabledOptionsList[att.name]) {
              enabledOptionsList[att.name] = [];
            }
            const value = typeof att.value === 'object' ? att.value.label : att.value;
            !enabledOptionsList[att.name].includes(value) &&
              enabledOptionsList[att.name].push(value);
          }
        });
      });
    });

    setEnabledOptions(enabledOptionsList);
  };

  const handleDeleteItem = async () => {
    const newCart = await basketAPI.removeFromCart(checkProductAvailabilityInCart()?.id ?? '');
    if (newCart) setCart?.(newCart);
  };

  return (
    productData && (
      <section className="product-details">
        <div className="product-details__content page-wrapper">
          <div style={{ display: 'none' }} className="product">{`Product details [id]: ${
            params.id ?? ''
          }`}</div>
          <h2 className="product-details__title visually-hidden">Product-details</h2>
          <ProductSlider images={productData.images} />
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
              <ProductDetailsOption
                key={option.title}
                data={option}
                onSelect={handleOptionSelect}
                enabledOptions={enabledOptions}
              />
            ))}
            <div className="product-details__basket-controls">
              <Counter
                onChangeValue={setProductQuantity}
                limit={selectedVariant?.availability.availableQuantity}
                accent
                className="product-details__counter"
              />
              {isProductInCart ? (
                <Button accent onClick={handleDeleteItem}>
                  Remove from Basket
                </Button>
              ) : (
                <Button accent onClick={handleAddItemToCart}>
                  Add to Basket
                </Button>
              )}
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
