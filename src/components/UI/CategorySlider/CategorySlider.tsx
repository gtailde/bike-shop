import './style.scss';
import React from 'react';
import { type ICategory } from 'types/types';
import { Swiper, SwiperSlide } from 'swiper/react';

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
    <Swiper className="category-slider" slidesPerView="auto">
      {categoryList.map((category) => (
        <SwiperSlide key={category.id}>
          <div
            key={category.id}
            onClick={() => {
              onSelect(category);
            }}
            className={`category-slider__item ${
              category === selectedCategory ? 'category-slider__item--selected' : ''
            }`}
          >
            {category.name['en-US']}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
