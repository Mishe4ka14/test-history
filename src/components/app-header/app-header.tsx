import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  font-weight: 700;
  font-size: 56px;
  color: #42567A;
  max-width: 350px;
`;

const GradientBar = styled.div`
  background: linear-gradient(#3877EE, #EF5DA8);
  width: 5px;
  height: 120px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 10%; 
  margin-bottom: -120px;
  margin-top: 7vh;
`;

const AppHeader = (): JSX.Element => {
  return (
    <Header>
      <GradientBar />
      <Title>Исторические даты</Title>
    </Header>
  );
};

export default AppHeader;
