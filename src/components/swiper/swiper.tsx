import React, { useState } from 'react';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { Controller } from 'swiper/modules';
import styled from 'styled-components';
import 'swiper/css';

// Стили для контейнера
const SwiperWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 20px;
`;

// Стили для кнопок
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const SwiperButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Swiper = () => {
  const [firstSwiper, setFirstSwiper] = useState<SwiperType | null>(null);
  const [secondSwiper, setSecondSwiper] = useState<SwiperType | null>(null);

  const handleNext = () => {
    if (firstSwiper && secondSwiper) {
      firstSwiper.slideNext();
      secondSwiper.slideNext();
    }
  };

  const handlePrev = () => {
    if (firstSwiper && secondSwiper) {
      firstSwiper.slidePrev();
      secondSwiper.slidePrev();
    }
  };

  return (
    <SwiperWrapper>
      <SwiperComponent
        modules={[Controller]}
        onSwiper={setFirstSwiper}
        controller={{ control: secondSwiper }}
        slidesPerView={1}
        loop={true}
      >
        <SwiperSlide>Slide 1A</SwiperSlide>
        <SwiperSlide>Slide 2A</SwiperSlide>
        <SwiperSlide>Slide 3A</SwiperSlide>
      </SwiperComponent>

      <SwiperComponent
        modules={[Controller]}
        onSwiper={setSecondSwiper}
        controller={{ control: firstSwiper }}
        slidesPerView={1}
        loop={true}
      >
        <SwiperSlide>Slide 1B</SwiperSlide>
        <SwiperSlide>Slide 2B</SwiperSlide>
        <SwiperSlide>Slide 3B</SwiperSlide>
      </SwiperComponent>

      <ButtonContainer>
        <SwiperButton onClick={handlePrev}>Previous</SwiperButton>
        <SwiperButton onClick={handleNext}>Next</SwiperButton>
      </ButtonContainer>
    </SwiperWrapper>
  );
};

export default Swiper;
