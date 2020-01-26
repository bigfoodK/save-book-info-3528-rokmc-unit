import React from 'react';
import styled from 'styled-components';
import SaveBook from './components/SaveBook';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  text-align: center;
  margin-top: 30vh;
`;

const App: React.FC = () => {
  return (
    <Container>
      <SaveBook />
    </Container>
  );
}

export default App;
