import React, { useEffect, useRef, useState } from 'react';
import { Swiper, type SwiperClass, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, Zoom, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/pagination';
import { Button } from 'components/UI/Button/Button';

export const ProductSlider = ({ images }: { images: string[] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();
  const [mainSwiper, setMainSwiper] = useState<SwiperClass>();
  const [activeSlide, setActiveSlide] = useState(0);
  const [popupShow, setPopupShow] = useState(false);

  const popupSlider = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.toggle('page-content--scroll-block', popupShow);
    popupSlider.current?.classList.toggle('image-slider__popup--show', popupShow);
  }, [popupShow]);

  return (
    <div className="image-slider">
      <Swiper
        modules={[Thumbs, Zoom]}
        className="image-slider__slide-line"
        slidesPerView={1}
        spaceBetween={16}
        loop
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        onSlideChange={(slider) => {
          setActiveSlide(slider.realIndex);
        }}
        onSwiper={(evt) => {
          setMainSwiper(evt);
        }}
      >
        {images.map((img, index) => (
          <SwiperSlide key={`${img}_${index}`} onClick={() => setPopupShow(true)}>
            <div className="swiper-zoom-container">
              <img src={img} alt="" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        modules={[Navigation]}
        className="image-slider__select-thumbs"
        watchSlidesProgress
        slidesPerView={'auto'}
        spaceBetween={16}
        loop
        onSwiper={(evt) => {
          setThumbsSwiper(evt);
        }}
      >
        {images.map((img, index) => (
          <SwiperSlide key={`${img}_${index}`} className="image-slider__select-thumb">
            <img
              src={img}
              alt=""
              style={{ filter: `brightness(${activeSlide === index ? '100' : '50'}%)` }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="image-slider__popup" ref={popupSlider}>
        <Button
          className="image-slider__close-button button--wo-borders"
          onClick={() => setPopupShow(false)}
        >
          Close
        </Button>
        <Swiper
          modules={[Thumbs, Zoom, Pagination]}
          className="image-slider__popup-slide-line"
          slidesPerView={1}
          spaceBetween={16}
          loop
          zoom={{ maxRatio: 2 }}
          thumbs={{ swiper: mainSwiper && !mainSwiper.destroyed ? mainSwiper : null }}
          watchSlidesProgress
          pagination={{ clickable: true }}
          onSwiper={(swiper) => swiper.zoom.in(2)}
          onSlideChangeTransitionEnd={(swiper) => swiper.zoom.in(2)}
          allowTouchMove={false}
        >
          {images.map((img, index) => (
            <SwiperSlide key={`${img}_${index}`}>
              <div className="swiper-zoom-container">
                <img src={img} alt="" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
