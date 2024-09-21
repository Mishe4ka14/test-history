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

const SwiperContainer = styled.div`
  margin-left: 10%;
`

const SwiperArrow: React.FC<SwiperArrowProps> = ({ setArrowSwiper, secondSwiper }) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 6;
  const swiperRef = useRef<SwiperType | null>(null);

  const handleNext = () => {
    if (currentSlide < totalSlides) {
      if (secondSwiper) {
        secondSwiper.slideNext();
      }
    } else {
      secondSwiper?.slideTo(0)
    }
  };

  const handlePrev = () => {
    if (currentSlide === 1) {
      if (secondSwiper) {
        secondSwiper.slideTo(totalSlides);
      }
    } else {
      if (secondSwiper) {
        secondSwiper.slidePrev();
      }
    }
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentSlide(swiper.realIndex + 1);
  };

  return (
    <SwiperContainer>
      <StyledSwiper
        modules={[Controller]}
        onSwiper={(swiper: SwiperType) => {
          setArrowSwiper(swiper);
          swiperRef.current = swiper;
        }}
        onSlideChange={handleSlideChange}
        controller={{ control: secondSwiper }} //связан с swiperLoop
        slidesPerView={1}
        loop={true}
      >
        {[...Array(totalSlides)].map((_, index) => (
          <StyledSwiperSlide key={index}>
          </StyledSwiperSlide>
        ))}
      </StyledSwiper>
      <Counter>
        {String(currentSlide).padStart(2, '0')}/{String(totalSlides).padStart(2, '0')}
      </Counter>
      <ArrowBtn onClick={handlePrev}>&lt;</ArrowBtn>
      <ArrowBtn onClick={handleNext}>&gt;</ArrowBtn>
    </SwiperContainer>
  );
};

export default SwiperArrow;
