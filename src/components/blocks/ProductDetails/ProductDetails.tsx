import React from 'react';
import { Button } from 'components/UI/Button/Button';
import './style.scss';
import { useParams } from 'react-router-dom';
import { ProductDetailsOption } from './ProductDetailsOption';
import { ProductSlider } from './ProductSlider';

import img1 from '../Catalog/assets/mock_photo-1.png';
import img2 from '../Catalog/assets/mock_photo-2.png';
import img3 from '../Catalog/assets/mock_photo-3.png';
import img4 from '../Catalog/assets/mock_photo-4.png';
import img5 from '../Catalog/assets/mock_photo-5.png';
import img6 from '../Catalog/assets/mock_photo-6.png';
import { Accordion } from 'components/UI/Accordion/Accordion';
import { Counter } from 'components/UI/Counter/Counter';

const options = [
  { title: 'Size', variants: ['S', 'M', 'L', 'XL'] },
  { title: 'Color', variants: ['Black', 'Gray', 'Green', 'Red'] },
];

const masterVariant = {
  images: [
    { url: img1 },
    { url: img2 },
    { url: img3 },
    { url: img4 },
    { url: img5 },
    { url: img6 },
  ],
};

const contents = [
  {
    title: 'Description',
    content: `The original design with the 3-part fold, handmade in our London factory since 1975. Compact and robust – it's a seriously engineered bike that's fun to ride.

Although C Line is made to stand up to the rigours of everyday life in the city, owners have taken them on around-the-world trips, on country tours and even to the South Pole, but mainly they are used 364-days a year to improve the day-to-day (we recommend a day-off for an annual service).`,
  },
  {
    title: 'Specificaiton',
    content: `Frame	
Aluminium 6061

Fork	
Aluminium 6061, Pneumatic Suspension

Brakes	
Tektro Hydraulic Disc

Rear Derailleur	
Shimano 7-speed

Shift Levers	
Shimano Altus, 7-speed

Pedals	
Yes

Wheels	
20" Aluminium rims

Front Tyre	
CST 20"

Rear Tyre	
CST 20"

Saddle	
Velo Premium EOVOLT

Battery	
Samsung 36v, 14ah, 504wh

Motor	
Bafang 36v 250w Brushless

Material	
Aluminium`,
  },
];

export const ProductDetails = () => {
  const params = useParams();
  return (
    <section className="product-details">
      <div className="product-details__content page-wrapper">
        <div style={{ display: 'none' }} className="product">{`Product details [id]: ${
          params.id ?? ''
        }`}</div>
        <h2 className="product-details__title visually-hidden">Product-details</h2>
        <ProductSlider images={masterVariant.images} />
        <div className="product-details__options">
          <p className="product-details__headline">
            <span className="product-details__name">Cube Cross Race C:68X TE 2023</span>
            <span className="product-details__category">Mountain Bike</span>
          </p>
          <p className="product-details__price">
            <span className="product-details__new-price">3 899.65</span>
            <span className="product-details__old-price">4 899.54</span>
          </p>
          {options.map((option, index) => (
            <ProductDetailsOption key={`${option.title}_${index}`} data={option} />
          ))}
          <div className="product-details__basket-controls">
            <Counter className="product-details__counter" />
            <Button accent>Add to Basket</Button>
          </div>
        </div>
        <Accordion className="product-details__accordion" contents={contents}></Accordion>
      </div>
    </section>
  );
};
