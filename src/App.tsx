import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #d00a0a;
  border-radius: 5px;
`

const Text = styled.p`
  color: blue;
  font-size: 20px;
`

function App() {
  return (
    <Container>
        <Text>
          <p>
            Hello fck WORLD
          </p>
        </Text>
    </Container>
  );
}

export default App;
