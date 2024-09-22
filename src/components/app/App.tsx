import React from 'react';
import styled from 'styled-components';
import AppHeader from '../app-header/app-header';
import ParentSwiper from '../swipers-parent/swipers-parent';
import SwiperContent from '../swiper-content/swiper-content';

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
  return (
    <Container>
      <AppHeader/>
      <ParentSwiper/>
      <SwiperContent/>
    </Container>
  );
}

export default App;
