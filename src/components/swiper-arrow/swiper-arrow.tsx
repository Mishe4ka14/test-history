import React from 'react';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { Controller } from 'swiper/modules';
import 'swiper/css';

interface SwiperArrowProps {
  setArrowSwiper: (swiper: SwiperType) => void;
  secondSwiper: SwiperType | null;
}

const SwiperArrow: React.FC<SwiperArrowProps> = ({ setArrowSwiper, secondSwiper }) => {
  return (
    <SwiperComponent
      modules={[Controller]}
      onSwiper={setArrowSwiper}
      controller={{ control: secondSwiper }}
      slidesPerView={1}
      loop={true}
    >
      <SwiperSlide>Slide 1A</SwiperSlide>
      <SwiperSlide>Slide 2A</SwiperSlide>
      <SwiperSlide>Slide 3A</SwiperSlide>
    </SwiperComponent>
  );
};

export default SwiperArrow;
