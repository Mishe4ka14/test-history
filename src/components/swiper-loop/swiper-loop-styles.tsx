import styled from 'styled-components';
import { Swiper as SwiperComponent } from 'swiper/react';

//МНОГО СТИЛЕЙ, ПОЭТОМУ В ОТДЕЛЬНЫЙ ФАЙЛ 

export const CircleContainer = styled.div`
  position: relative;
  width: 530px;
  height: 530px;
  border-radius: 50%;
  border: 2px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Line = styled.div`
  position: absolute;
  background-color: rgba(66, 86, 122, 0.2);
  z-index: 0;

  &:first-child { //вертикальная линия
    width: 2px; 
    height: 100vh; 
    left: 50%; 
    transform: translateX(-50%);
  }

  &:nth-child(2) { //горизонтальная линия
    max-width: 1440px;
    width: 81vw; 
    height: 2px; 
    top: 50%; 
    transform: translateY(-50%); 
  }
`;


export const DotsWrapper = styled.div`
  position: absolute;
  width: 530px;
  height: 530px;
  border-radius: 50%;
  transform-origin: center;
  will-change: transform;
  z-index: 100;
`;

export const HoverNumber = styled.p`
  z-index: 100;
  color: black;
`;

export const BlockTitle = styled.p`
  position: absolute;
  left: 70px;
  color: rgba(66, 86, 122, 1);
  opacity: 0;
  transition: opacity 1s ease-in-out;
  animation: fadeIn 1s ease-in-out 0.8s forwards;
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

export const SwiperComponentStyled = styled(SwiperComponent)`
  overflow: visible;
`