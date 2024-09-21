import React, { useState, useRef } from 'react';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { Controller } from 'swiper/modules';
import 'swiper/css';
import styled from 'styled-components';
import gsap from 'gsap';
import SwiperLoopDot from '../swiper-loop-dot/swiper-loop-dot';
import { useSlides } from '../../context/slides-context';
import AnimatedYears from '../animated-years/animated-years';

interface SwiperLoopProps {
  setSwiperLoop: (swiper: SwiperType) => void;
  firstSwiper: SwiperType | null;
  secondSwiper: SwiperType | null;
}

const CircleContainer = styled.div`
  position: relative;
  width: 530px;
  height: 530px;
  border-radius: 50%;
  border: 2px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DotsWrapper = styled.div`
  position: absolute;
  width: 530px;
  height: 530px;
  border-radius: 50%;
  transform-origin: center;
  will-change: transform;
`;

const HoverNumber = styled.p`
  z-index: 100;
  color: black;
`;

const BlockTitle = styled.p`
  position: absolute;
  left: 70px;
  color: rgba(66, 86, 122, 1);
  opacity: 0;
  transition: opacity 1s ease-in-out;
  animation: fadeIn 1s ease-in-out 1s forwards;
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
  text-align: left;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

const SwiperLoop: React.FC<SwiperLoopProps> = ({ setSwiperLoop, firstSwiper, secondSwiper }) => {
  const dotsWrapperRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState<number>(0); // стейт для активной точки
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // cтейт для отслеживания наведенной точки
  const [rotationAngle, setRotationAngle] = useState<number>(0); // стейт для угла вращения
  const radius = 265;
  
  const slides = useSlides();
  const totalSlides = slides.length;
  
  const anglePerDot = (Math.PI * 2) / totalSlides; // выставляем угол точек, в зависимости от количества
  const updateRotation = (newActiveIndex: number) => {
    const deltaIndex = (newActiveIndex - activeDot + totalSlides) % totalSlides;
    const reverseDeltaIndex = (activeDot - newActiveIndex + totalSlides) % totalSlides;

    const isForward = deltaIndex <= reverseDeltaIndex;
    const deltaAngle = isForward ? deltaIndex * anglePerDot : -reverseDeltaIndex * anglePerDot;
    const newRotationAngle = rotationAngle - (deltaAngle * 180) / Math.PI;

    setRotationAngle(newRotationAngle);

    if (dotsWrapperRef.current) {
      gsap.to(dotsWrapperRef.current, {
        duration: 1,
        ease: 'power2.out',
        rotate: `${newRotationAngle}deg`,
        force3D: true,
      });
    }

    setActiveDot(newActiveIndex);
  };

  const handleSlideChange = (swiper: SwiperType) => {
    const newIndex = swiper.realIndex;
    if (newIndex !== activeDot) {
      updateRotation(newIndex);
      setActiveDot(newIndex);
      
      if (firstSwiper && firstSwiper.realIndex !== newIndex) {
        firstSwiper.slideTo(newIndex);
      }
    }
  };

  return (
    <CircleContainer>
      <DotsWrapper ref={dotsWrapperRef}>
        {Array.from({ length: totalSlides }, (_, index) => {
          const offsetAngle = -Math.PI / 4; // смещение
          const angle = index * anglePerDot + offsetAngle;
          const x = Math.cos(angle) * radius + 265;
          const y = Math.sin(angle) * radius + 265;

          return (
            <SwiperLoopDot
              key={index}
              active={activeDot === index}
              style={{
                transform: `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${-rotationAngle}deg)`,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => {
                updateRotation(index);
                if (firstSwiper) {
                  firstSwiper.slideTo(index);
                }
                if (secondSwiper) {
                  secondSwiper.slideTo(index);
                }
              }}
            >
              {(activeDot === index || hoveredIndex === index) && (
                <HoverNumber>{index + 1}</HoverNumber>
              )}
              {activeDot === index && (
                <BlockTitle>{slides[index]?.title}</BlockTitle>
              )}
            </SwiperLoopDot>
          );
        })}
      </DotsWrapper>

      <SwiperComponent
        modules={[Controller]}
        onSwiper={setSwiperLoop}
        onSlideChange={handleSlideChange}
        controller={{ control: firstSwiper }}
        slidesPerView={1}
        loop={true}
      >
        {slides.map((slide, index) => (
        <SwiperSlide key={index}></SwiperSlide>
      ))}
        <AnimatedYears activeSlideIndex={activeDot} slides={slides} />
      </SwiperComponent>
    </CircleContainer>
  );
};

export default SwiperLoop;
