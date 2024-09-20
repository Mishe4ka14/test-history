import React from 'react';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { Controller } from 'swiper/modules';
import 'swiper/css';

interface SwiperLoopProps {
  setSwiperLoop: (swiper: SwiperType) => void;
  firstSwiper: SwiperType | null;
}

const SwiperLoop: React.FC<SwiperLoopProps> = ({ setSwiperLoop, firstSwiper }) => {
  return (
    <SwiperComponent
      modules={[Controller]}
      onSwiper={setSwiperLoop}
      controller={{ control: firstSwiper }} // Связь с первым слайдером
      slidesPerView={1}
      loop={true}
    >
      <SwiperSlide>Slide 1B</SwiperSlide>
      <SwiperSlide>Slide 2B</SwiperSlide>
      <SwiperSlide>Slide 3B</SwiperSlide>
    </SwiperComponent>
  );
};

export default SwiperLoop;
