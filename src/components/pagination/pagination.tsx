import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setActiveSlideIndex } from '../../features/slider-slice';
import styled from 'styled-components';

const StyledSwiper = styled(Swiper)`
  width: 86px;
  margin-top: 4vh;
`;

const SmallSlider: React.FC = () => {
  const dispatch = useDispatch();
  const slides = useSelector((store: RootState) => store.slides.slides);
  const activeSlideIndex = useSelector((store: RootState) => store.slides.activeSlideIndex);
  const swiperRef = useRef<SwiperType | null>(null); // реф на Swiper

  const handleSlideClick = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index); 
      dispatch(setActiveSlideIndex(index));
    }
  };

  return (
    <>
      {/* <GlobalStyles /> */}
      <StyledSwiper
        spaceBetween={1}
        slidesPerView={slides.length}
        initialSlide={activeSlideIndex}
        pagination={{ clickable: true }}
        onSwiper={(swiper: SwiperType) => (swiperRef.current = swiper)}
      >
        {slides.map((_, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: activeSlideIndex === index ? 'blue' : 'gray',
                cursor: 'pointer',
              }}
              onClick={() => handleSlideClick(index)}
            />
          </SwiperSlide>
        ))}
      </StyledSwiper>
    </>
  );
};

export default SmallSlider;
