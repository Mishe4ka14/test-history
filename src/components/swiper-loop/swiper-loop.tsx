import React, { useState, useRef } from 'react';
import { SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { Controller } from 'swiper/modules';
import 'swiper/css';
import gsap from 'gsap';
import SwiperLoopDot from '../swiper-loop-dot/swiper-loop-dot';
import AnimatedYears from '../animated-years/animated-years';
//МНОГО СТИЛЕЙ, ПОЭТОМУ В ОТДЕЛЬНОМ ФАЙЛЕ
import { BlockTitle, CircleContainer, DotsWrapper, HoverNumber, Line, SwiperComponentStyled } from './swiper-loop-styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setActiveSlideIndex } from '../../features/slider-slice';

interface SwiperLoopProps {
  setSwiperLoop: (swiper: SwiperType) => void;
  firstSwiper: SwiperType | null;
  secondSwiper: SwiperType | null;
}

const SwiperLoop: React.FC<SwiperLoopProps> = ({ setSwiperLoop, firstSwiper, secondSwiper }) => {
  const dispatch = useDispatch();
  const dotsWrapperRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState<number>(0); // стейт для активной точки
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // cтейт для отслеживания наведенной точки
  const [rotationAngle, setRotationAngle] = useState<number>(0); // стейт для угла вращения
  const radius = 265;
  
  // получаем слайды из редакса
  const slides = useSelector((store: RootState) => store.slides.slides);
  const totalSlides = slides.length;
  
  const anglePerDot = (Math.PI * 2) / totalSlides; // выставляем угол точек, в зависимости от количества

  const updateRotation = (newActiveIndex: number) => {
    const deltaIndex = (newActiveIndex - activeDot + totalSlides) % totalSlides; // считаем на сколько индексов изменился активный элемент
    const reverseDeltaIndex = (activeDot - newActiveIndex + totalSlides) % totalSlides; // считаем сколько нужно пройти в обратном направлении

    const isForward = deltaIndex <= reverseDeltaIndex; //определяем направление
    const deltaAngle = isForward ? deltaIndex * anglePerDot : -reverseDeltaIndex * anglePerDot; // считаем угол в зависимости от направления
    const newRotationAngle = rotationAngle - (deltaAngle * 180) / Math.PI;

    setRotationAngle(newRotationAngle);

    if (dotsWrapperRef.current) {
      gsap.to(dotsWrapperRef.current, {
        duration: 1,
        ease: 'power2.out',
        rotate: `${newRotationAngle}deg`,  // угол вращения
        force3D: true,
      });
    }

    dispatch(setActiveSlideIndex(newActiveIndex));
    setActiveDot(newActiveIndex);
  };

  const handleSlideChange = (swiper: SwiperType) => {
    const newIndex = swiper.realIndex;
    if (newIndex !== activeDot) {

      updateRotation(newIndex); //вращаем
      dispatch(setActiveSlideIndex(newIndex)); //диспатчим новым активный индекс
      setActiveDot(newIndex); //устанавливаем новую активную точку
      
      if (firstSwiper && firstSwiper.realIndex !== newIndex) {
        firstSwiper.slideTo(newIndex);
      }
    }
  };

  return (
    <CircleContainer>
      <Line />
      <Line />
      <DotsWrapper ref={dotsWrapperRef}>
        {Array.from({ length: totalSlides }, (_, index) => {
          const offsetAngle = -Math.PI / 3; // смещение
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

      <SwiperComponentStyled
        modules={[Controller]}
        onSwiper={setSwiperLoop}
        onSlideChange={handleSlideChange}
        controller={{ control: firstSwiper }}
        slidesPerView={1}
        loop={true}
        style={{zIndex: 0}}
      >
        {slides.map((_, index) => (
        <SwiperSlide key={index}></SwiperSlide>
      ))}
        <AnimatedYears activeSlideIndex={activeDot}/>
      </SwiperComponentStyled>
    </CircleContainer>
  );
};

export default SwiperLoop;
