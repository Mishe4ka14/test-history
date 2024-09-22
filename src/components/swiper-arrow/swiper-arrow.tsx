import React, { useState, useRef } from 'react';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { Controller } from 'swiper/modules';
import 'swiper/css';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setActiveSlideIndex } from '../../features/slider-slice';

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
`;

const SwiperArrow: React.FC<SwiperArrowProps> = ({ setArrowSwiper, secondSwiper }) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const dispatch = useDispatch();
  
  // получаем слайды и активный слайд
  const slides = useSelector((store: RootState) => store.slides.slides);
  const activeSlideIndex = useSelector((store: RootState) => store.slides.activeSlideIndex);
  const totalSlides = slides.length;

  const swiperRef = useRef<SwiperType | null>(null);


  // при смене слайда диспатчим новый активный стайд, чтобы забрать индекс в swiperContent 
  const handleNext = () => {
    if (activeSlideIndex < totalSlides - 1) {
      secondSwiper?.slideNext();
      dispatch(setActiveSlideIndex(activeSlideIndex + 1));
    } else {
      secondSwiper?.slideTo(0);
      dispatch(setActiveSlideIndex(0));
    }
  };

  const handlePrev = () => {
    if (activeSlideIndex === 0) {
      secondSwiper?.slideTo(totalSlides - 1);
      dispatch(setActiveSlideIndex(totalSlides - 1));
    } else {
      secondSwiper?.slidePrev();
      dispatch(setActiveSlideIndex(activeSlideIndex - 1));
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
        controller={{ control: secondSwiper }} // связан с swiperLoop
        slidesPerView={1}
        loop={true}
      >
        {slides.map((_, index) => (
          <StyledSwiperSlide key={index} />
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
