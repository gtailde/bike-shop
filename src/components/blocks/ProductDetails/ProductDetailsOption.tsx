import React from 'react';

export const ProductDetailsOption = ({ data }: { data: { title: string; list: string[] } }) => {
  return (
    <div className="product-details__option">
      <p className="product-details__option-title">{data.title}</p>
      <div className="product-details__option-variants">
        {data.list.map((item, index) => {
          return (
            <label
              key={`${item}_${index}`}
              className="product-details__option-variant radio-button"
            >
              <input className="radio-button__input" type="radio" name={data.title} value={item} />
              <span className="radio-button__label">{item}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};
