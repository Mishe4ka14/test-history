import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Slide } from '../../features/slider-slice';
import styled from 'styled-components';

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SlideTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const EventList = styled.ul`
  list-style: none;
  padding: 0;
`;

const EventItem = styled.li`
  font-size: 18px;
  margin: 5px 0;
`;

const SwiperContent: React.FC = () => {
  const slides = useSelector((store: RootState) => store.slides.slides);
  const activeSlideIndex = useSelector((store: RootState) => store.slides.activeSlideIndex);

  const activeSlide: Slide = slides[activeSlideIndex];

  return (
    <SliderContainer>
      <SlideTitle>{activeSlide.title}</SlideTitle>
      <EventList>
        {activeSlide.content.map((event) => (
          <EventItem key={event.year}>
            {event.year}: {event.event}
          </EventItem>
        ))}
      </EventList>
    </SliderContainer>
  );
};

export default SwiperContent;
