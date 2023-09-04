import './style.scss';
import React from 'react';
import { type ICategory } from 'types/types';

interface ICategorySliderProps {
  categoryList: ICategory[];
  selectedCategory: ICategory | undefined;
  onSelect: (data: ICategory) => void;
}

export const CategorySlider = ({
  categoryList,
  selectedCategory,
  onSelect,
}: ICategorySliderProps) => {
  return (
    <ul className="category-slider">
      {categoryList.map((category) => (
        <li
          key={category.id}
          onClick={() => {
            onSelect(category);
          }}
          className={`category-slider__item ${
            category === selectedCategory ? 'category-slider__item--selected' : ''
          }`}
        >
          {category.name['en-US']}
        </li>
      ))}
    </ul>
  );
};
