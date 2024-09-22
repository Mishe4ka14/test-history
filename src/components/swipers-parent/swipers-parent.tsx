import React, { useState } from 'react';
import { Swiper as SwiperType } from 'swiper';
import SwiperArrow from '../swiper-arrow/swiper-arrow';
import SwiperLoop from '../swiper-loop/swiper-loop';
import styled from 'styled-components';

const LoopBox = styled.div`
  display: flex;
  justify-content: center;
`;

const ParentSwiper = () => {
  const [arrowSwiper, setArrowSwiper] = useState<SwiperType | null>(null);
  const [loopSwiper, setLoopSwiper] = useState<SwiperType | null>(null);

  // передаем оба свайпера друг другу для синхронизации
  return (
    <React.Fragment>
      <LoopBox>
        <SwiperLoop
          setSwiperLoop={setLoopSwiper}
          firstSwiper={arrowSwiper}
          secondSwiper={loopSwiper}
        />
      </LoopBox>
        <SwiperArrow
          setArrowSwiper={setArrowSwiper}
          secondSwiper={loopSwiper}
        />
    </React.Fragment>
  );
};

export default ParentSwiper;
