import React, { useState } from 'react';
import { Swiper as SwiperType } from 'swiper';
import SwiperArrow from '../swiper-arrow/swiper-arrow';
import SwiperLoop from '../swiper-loop/swiper-loop';

const ParentSwiper = () => {
  const [arrowSwiper, setArrowSwiper] = useState<SwiperType | null>(null);
  const [loopSwiper, setLoopSwiper] = useState<SwiperType | null>(null);

  return (
    <div>
      <SwiperArrow setArrowSwiper={setArrowSwiper} secondSwiper={loopSwiper} />
      <SwiperLoop setSwiperLoop={setLoopSwiper} firstSwiper={arrowSwiper} />
    </div>
  );
};

export default ParentSwiper;
