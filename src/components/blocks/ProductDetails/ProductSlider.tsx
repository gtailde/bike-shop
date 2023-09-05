import React, { useState } from 'react';
import { Swiper, type SwiperClass, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';

export const ProductSlider = ({ images }: { images: Array<{ url: string }> }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();
  const [activeSlide, setActiveSlide] = useState(0);
  return (
    <div className="image-slider">
      <Swiper
        modules={[Navigation, Thumbs]}
        className="image-slider__slide-line"
        freeMode
        watchSlidesProgress
        slidesPerView={1}
        spaceBetween={16}
        loop
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        onSlideChange={(slider) => {
          setActiveSlide(slider.realIndex);
        }}
      >
        {images.map((img) => (
          <SwiperSlide key={img.url}>
            <img src={img.url} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        className="image-slider__select-thumbs"
        watchSlidesProgress
        slidesPerView={4}
        spaceBetween={16}
        loop
        onSwiper={(evt) => {
          setThumbsSwiper(evt);
        }}
      >
        {images.map((img, index) => (
          <SwiperSlide key={img.url} className="image-slider__select-thumb">
            <img
              src={img.url}
              alt=""
              style={{ filter: `brightness(${activeSlide === index ? '50' : '100'}%)` }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
