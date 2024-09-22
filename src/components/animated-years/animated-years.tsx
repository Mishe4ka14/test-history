import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface YearsDisplayProps {
  activeSlideIndex: number;
}

const StyledSlide = styled.div`
  max-height: 160px;
  font-size: 20vh;
  font-weight: 700;
  line-height: 160px;
  letter-spacing: -0.02em;
  text-align: center;
  transition: opacity 0.5s ease;
  opacity: 1;
  z-index: 101;
`;

const YearText = styled.span<{ color: string }>`
  color: ${({ color }) => color};
  padding-left: 2.6vw;
  padding-right: 2.6vw;
`;

const AnimatedYears: React.FC<YearsDisplayProps> = ({ activeSlideIndex }) => {
  const slides = useSelector((store: RootState) => store.slides.slides );
  const [currentStartYear, setCurrentStartYear] = useState<string>(slides[activeSlideIndex].years.split(' ')[0]);
  const [currentEndYear, setCurrentEndYear] = useState<string>(slides[activeSlideIndex].years.split(' ')[1]);


  useEffect(() => {
    const nextYears = slides[activeSlideIndex].years;
    const [nextStartYear, nextEndYear] = nextYears.split(' ').map(Number);
    let currentStartYearNum = parseInt(currentStartYear);
    let currentEndYearNum = parseInt(currentEndYear);

    const animateYears = () => {
      const startDiff = nextStartYear - currentStartYearNum;
      const endDiff = nextEndYear - currentEndYearNum;

      const animation = gsap.to({}, {
        duration: 1,
        onUpdate: () => {
          if (currentStartYearNum !== nextStartYear) {
            currentStartYearNum += startDiff > 0 ? 1 : -1;
          }
          if (currentEndYearNum !== nextEndYear) {
            currentEndYearNum += endDiff > 0 ? 1 : -1;
          }
          setCurrentStartYear(`${currentStartYearNum}`);
          setCurrentEndYear(`${currentEndYearNum}`);
        },
        ease: 'power1.inOut',
        onComplete: () => {
          setCurrentStartYear(`${nextStartYear}`);
          setCurrentEndYear(`${nextEndYear}`);
        },
      });

      return animation;
    };

    animateYears();
  }, [activeSlideIndex, currentStartYear, currentEndYear, slides]);

  return (
    <StyledSlide>
      <YearText color="rgba(56, 119, 238, 1)">{currentStartYear}</YearText>
      <YearText color="rgba(239, 93, 168, 1)">{currentEndYear}</YearText>
    </StyledSlide>
  );
};

export default AnimatedYears;
