import React, { useEffect, useState } from 'react';
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
    width: 40px; 
    height: 40px;
    border-radius: 50%;
    z-index: 1000;
    &:after {
      font-size: 20px; 
    }
    @media (max-width: 768px) {
      display: none;
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
  max-width: 78vw;
  padding-left: 5vw;
  padding-right: 5vw;
  @media (max-width: 768px) {
    height: 160px;
  }
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  width: 350px;
  height: 150px;

  @media (max-width: 768px) {
    width: 166px;
    height: 80px;
  }
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

  @media (max-width: 768px) {
    font-size: 16px;
    font-weight: 400;
    line-height: 19.2px;
  }
`;

const StyledEvent = styled.p`
  margin: 0;
  padding: 0;
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
  text-align: left;
  color: rgba(66, 86, 122, 1);

  @media (max-width: 768px) {
    font-size: 14px;
    font-weight: 400;
    line-height: 20.3px;
  }
`;

const HorizontalLine = styled.hr`
  display: none;
  border: none;
  border-top: 1px solid rgba(199, 205, 217, 1);
  width: 80vw;
  margin:0 auto;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const SectionTitle = styled.p`
  width: 300px;
  padding-left: 7vw;
  font-size: 24px;
  color: rgba(66, 86, 122, 1);
  margin: 0;
  z-index:1000;
  display: block;
  visibility: visible;
  overflow: visible;
`;

const SwiperContent: React.FC = () => {
  const slides = useSelector((store: RootState) => store.slides.slides);
  const activeSlideIndex = useSelector((store: RootState) => store.slides.activeSlideIndex);
  const activeSlide = slides[activeSlideIndex];

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <>
      <GlobalStyles />
      {isMobile && <SectionTitle>{activeSlide.title}</SectionTitle>}
      <HorizontalLine/>
      <SliderContainer>
        <StyledSwiper
          modules={[Navigation]}
          slidesPerView={3}
          spaceBetween={100}
          navigation={true}
          loop={false}
          breakpoints={{
            0: {
              slidesPerView: 2, 
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 3,
            },
          }}
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
