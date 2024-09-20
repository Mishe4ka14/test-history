import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { Controller } from 'swiper/modules';
import 'swiper/css';
import styled from 'styled-components';
import gsap from 'gsap';

interface SwiperLoopProps {
  setSwiperLoop: (swiper: SwiperType) => void;
  firstSwiper: SwiperType | null;
  secondSwiper: SwiperType | null;
}

interface SlideDotProps {
  active: boolean;
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

// используем forwardRef для передачи внутрь компонента
const SlideDotComponent = forwardRef<HTMLDivElement, SlideDotProps & React.HTMLAttributes<HTMLDivElement>>(
  ({ active, ...rest }, ref) => (
    <div ref={ref} {...rest} />
  )
);

// стили для точки, отслеживаем состояние hovera
const SlideDot = styled(SlideDotComponent)<SlideDotProps>`
  position: absolute;
  width: ${({ active }) => (active ? '50px' : '6px')};
  height: ${({ active }) => (active ? '50px' : '6px')};
  border-radius: 50%;
  background-color: ${({ active }) => (active ? '#fff' : '#000')};
  color: ${({ active }) => (active ? '#000' : 'transparent')};
  border: ${({ active }) => (active ? '1px solid black' : '1px')};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    width: 50px;
    height: 50px;
    background-color: #fff;
    border: 1px solid black;
  }
`;

const SwiperLoop: React.FC<SwiperLoopProps> = ({ setSwiperLoop, firstSwiper, secondSwiper }) => {
  const dotsRef = useRef<HTMLDivElement[]>([]);
  const totalSlides = 3;
  const [activeDot, setActiveDot] = useState<number>(0);

  const positionDots = () => {
    const radius = 265;
    const offsetAngle = -Math.PI / 4;
    dotsRef.current.forEach((dot, index) => {
      const angle = (index / totalSlides) * Math.PI * 2 + offsetAngle;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      gsap.set(dot, { x, y });
    });
  };

  useEffect(() => {
    positionDots();
  }, []);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveDot(swiper.realIndex);
    if (firstSwiper) {
      firstSwiper.slideTo(swiper.realIndex); // Обновляем первый слайдер
    }
  };

  return (
    <CircleContainer>
      {Array.from({ length: totalSlides }, (_, index) => (
        <SlideDot
          key={index}
          ref={(el) => el && (dotsRef.current[index] = el)}
          active={activeDot === index}
          onClick={() => {
            setActiveDot(index);
            if (firstSwiper) {
              firstSwiper.slideTo(index); // Обновляем первый слайдер
            }
            if (secondSwiper) {
              secondSwiper.slideTo(index); // Обновляем второй слайдер
            }
          }}
        >
          {index + 1}
        </SlideDot>
      ))}

      <SwiperComponent
        modules={[Controller]}
        onSwiper={setSwiperLoop}
        onSlideChange={handleSlideChange} // Добавляем обработчик смены слайдов
        controller={{ control: firstSwiper }}
        slidesPerView={1}
        loop={true}
      >
        {Array.from({ length: totalSlides }, (_, index) => (
          <SwiperSlide key={index}>
            Слайд {index + 1}
          </SwiperSlide>
        ))}
      </SwiperComponent>
    </CircleContainer>
  );
};


export default SwiperLoop;
