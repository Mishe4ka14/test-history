import React, { useState, useRef } from 'react';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { Controller } from 'swiper/modules';
import 'swiper/css';
import styled from 'styled-components';
import gsap from 'gsap';
import SwiperLoopDot from '../swiper-loop-dot/swiper-loop-dot';

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

const SwiperLoop: React.FC<SwiperLoopProps> = ({ setSwiperLoop, firstSwiper, secondSwiper }) => {
  const dotsWrapperRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState<number>(0); // стейт для активной точки
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0); // cтейт для отслеживания наведенной точки
  const [rotationAngle, setRotationAngle] = useState<number>(0); // стейт для угла вращения

  const totalSlides = 6;
  const radius = 265;
  const anglePerDot = (Math.PI * 2) / totalSlides; // выставляем угол точек, в зависимости от количества

  const updateRotation = (newActiveIndex: number) => {
    const deltaIndex = (newActiveIndex - activeDot + totalSlides) % totalSlides; // считаем на сколько индексов изменился активный элемент
    const reverseDeltaIndex = (activeDot - newActiveIndex + totalSlides) % totalSlides; // считаем сколько нужно пройти в обратном направлении
  
    const isForward = deltaIndex <= reverseDeltaIndex; // определяем направление
    const deltaAngle = isForward ? deltaIndex * anglePerDot : -reverseDeltaIndex * anglePerDot; // считаем угол в зависимости от направления
    const newRotationAngle = rotationAngle - (deltaAngle * 180) / Math.PI;
  
    setRotationAngle(newRotationAngle);
  
    if (dotsWrapperRef.current) {
      gsap.to(dotsWrapperRef.current, {
        duration: 2,
        ease: 'power2.out',
        rotate: `${newRotationAngle}deg`,  // угол вращения
        force3D: true,
      });
    }

    setActiveDot(newActiveIndex);
  };

  const handleSlideChange = (swiper: SwiperType) => {
    updateRotation(swiper.realIndex);
    if (firstSwiper) {
      firstSwiper.slideTo(swiper.realIndex);
    }
  };

  return (
    <CircleContainer>
      <DotsWrapper ref={dotsWrapperRef}>
        {Array.from({ length: totalSlides }, (_, index) => {
          const offsetAngle = -Math.PI / 4;
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
              {(activeDot === index || hoveredIndex === index) && ( // показываем номер при наведении или если активен
                <HoverNumber>{index + 1}</HoverNumber>
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
        {Array.from({ length: totalSlides }, (_, index) => (
          <SwiperSlide key={index}>Слайд {index + 1}</SwiperSlide>
        ))}
      </SwiperComponent>
    </CircleContainer>
  );
};

export default SwiperLoop;
