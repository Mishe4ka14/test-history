import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AppHeader from '../app-header/app-header';
import ParentSwiper from '../swipers-parent/swipers-parent';
import SwiperContent from '../swiper-content/swiper-content';
import Pagination from '../pagination/pagination';

const Container = styled.div`
  margin: auto;
  background-color: rgba(255, 255, 255, 0.1);
  max-width: 1440px;
  border-left: 1px solid rgba(66, 86, 122, 0.2);
  border-right: 1px solid rgba(66, 86, 122, 0.2);
  font-family: sans-serif;
  padding-bottom: 5vh;
  overflow: hidden;
`;

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Container>
      <AppHeader />
      <ParentSwiper/> 
      <SwiperContent />
      {isMobile && ( 
          <Pagination/>
      )}
    </Container>
  );
}

export default App;
