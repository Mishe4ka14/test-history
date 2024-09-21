import React, { useState, useRef } from 'react';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { Controller } from 'swiper/modules';
import 'swiper/css';
import styled from 'styled-components';

interface SwiperArrowProps {
  setArrowSwiper: (swiper: SwiperType) => void;
  secondSwiper: SwiperType | null;
}

const ArrowBtn = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 10px;
  background-color: white;
  transition: background-color 0.3s ease;
  font-size: 24px;
  &:hover {
    background-color: gray;
  }
`;

const StyledSwiper = styled(SwiperComponent)`
  max-width: 120px;
  margin: 0;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
`;

const Counter = styled.p`
  margin: 0;
  margin-left: 10px;
  font-size: 18px;
  font-weight: normal;
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  height: 1px;
  width: 1px;
`;

const SwiperArrow: React.FC<SwiperArrowProps> = ({ setArrowSwiper, secondSwiper }) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 6;
  const swiperRef = useRef<SwiperType | null>(null);

  const handleNext = () => {
    if (currentSlide < totalSlides) {
      if (secondSwiper) {
        secondSwiper.slideNext();
      }
    }
  };

  const handlePrev = () => {
    if (currentSlide > 1) {
      if (secondSwiper) {
        secondSwiper.slidePrev();
      }
    }
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentSlide(swiper.realIndex + 1); // обновляем текущий слайд
  };

  return (
    <>
      <StyledSwiper
        modules={[Controller]}
        onSwiper={(swiper: SwiperType) => {
          setArrowSwiper(swiper);
          swiperRef.current = swiper;
        }}
        onSlideChange={handleSlideChange}
        controller={{ control: secondSwiper }}
        slidesPerView={1}
        loop={true}
      >
        <Box>
          <StyledSwiperSlide></StyledSwiperSlide>
          <StyledSwiperSlide></StyledSwiperSlide>
          <StyledSwiperSlide></StyledSwiperSlide>
          <StyledSwiperSlide></StyledSwiperSlide>
          <StyledSwiperSlide></StyledSwiperSlide>
          <StyledSwiperSlide></StyledSwiperSlide>
        </Box>
        <Counter>
          {String(currentSlide).padStart(2, '0')}/{String(totalSlides).padStart(2, '0')}
        </Counter>
      </StyledSwiper>
      <ArrowBtn onClick={handlePrev}>&lt;</ArrowBtn>
      <ArrowBtn onClick={handleNext}>&gt;</ArrowBtn>
    </>
  );
};

export default SwiperArrow;
