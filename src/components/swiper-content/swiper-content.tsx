import React from 'react';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import styled, { createGlobalStyle } from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

// стили для навигационных кнопок
const GlobalStyles = createGlobalStyle`
  .swiper-button-next,
  .swiper-button-prev {
    background-color: white; 
    color: rgba(56, 119, 238, 1); 
    width: 50px; 
    height: 50px;
    border-radius: 50%;
    z-index: 1000;
    &:after {
      font-size: 20px; 
    }
  }

  .swiper-button-disabled {
    display: none;
  }
`;

const EventItem = styled.li`
  font-size: 18px;
  margin: 5px 0;
`;

const StyledSwiper = styled(SwiperComponent)`
  max-width: 75vw;
  padding-left: 5vw;
  padding-right: 5vw;
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  width: 350px;
  height: 150px;
`;

const SliderContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 4vh;
  overflow: hidden;
`;

const StyledYear = styled.h4`
  margin: 0;
  padding: 0;
  font-size: 25px;
  font-weight: 400;
  line-height: 30px;
  text-align: left;
  color: rgba(56, 119, 238, 1);
`;

const StyledEvent = styled.p`
  margin: 0;
  padding: 0;
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
  text-align: left;
  color: rgba(66, 86, 122, 1);
`;

const SwiperContent: React.FC = () => {
  const slides = useSelector((store: RootState) => store.slides.slides);
  const activeSlideIndex = useSelector((store: RootState) => store.slides.activeSlideIndex);
  const activeSlide = slides[activeSlideIndex];

  return (
    <>
      <GlobalStyles />
      <SliderContainer>
        <StyledSwiper
          modules={[Navigation]}
          slidesPerView={3}
          spaceBetween={100}
          navigation={true}
          loop={false}
        >
          {activeSlide.content.map((event, index) => (
            <StyledSwiperSlide key={index}>
              <EventItem>
                <StyledYear>{event.year}</StyledYear>
                <StyledEvent>{event.event}</StyledEvent>
              </EventItem>
            </StyledSwiperSlide>
          ))}
        </StyledSwiper>
      </SliderContainer>
    </>
  );
};

export default SwiperContent;
