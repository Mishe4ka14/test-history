import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { Slide } from '../../context/slides-context'; 

interface YearsDisplayProps {
  activeSlideIndex: number;
  slides: Slide[];
}

const StyledSlide = styled.div`
  font-size: 100px;
  font-weight: 700;
  line-height: 160px;
  letter-spacing: -0.02em;
  text-align: center;
  transition: opacity 0.5s ease;
  opacity: 1;
  z-index:0 ;
`;

const AnimatedYears: React.FC<YearsDisplayProps> = ({ activeSlideIndex, slides }) => {
  const [currentYear, setCurrentYear] = useState<string>(slides[activeSlideIndex].years);

  useEffect(() => {
    const nextYears = slides[activeSlideIndex].years;
    const [nextStartYear, nextEndYear] = nextYears.split(' ').map(Number);
    let [currentStartYear, currentEndYear] = currentYear.split(' ').map(Number);

    // делаем анимацию для цифр
    const animateYears = () => {
      const startDiff = nextStartYear - currentStartYear;
      const endDiff = nextEndYear - currentEndYear;

      const animation = gsap.to({}, {
        duration: 1,
        onUpdate: () => {
          if (currentStartYear !== nextStartYear) {
            currentStartYear += startDiff > 0 ? 1 : -1;
          }
          if (currentEndYear !== nextEndYear) {
            currentEndYear += endDiff > 0 ? 1 : -1;
          }
          setCurrentYear(`${currentStartYear} ${currentEndYear}`);
        },
        ease: 'power1.inOut',
        onComplete: () => {
          // выставляем конечные года
          setCurrentYear(`${nextStartYear} ${nextEndYear}`);
        },
      });

      return animation;
    };

    // запускаем анимацию если года отличаются
    if (currentYear !== nextYears) {
      animateYears();
    }
  }, [activeSlideIndex, currentYear, slides]);

  return <StyledSlide>{currentYear}</StyledSlide>;
};

export default AnimatedYears;


