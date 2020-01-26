import React from 'react';
import styled from 'styled-components';
import SaveBook from './components/SaveBook';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 8em;
  box-sizing: border-box;
  text-align: center;
`;



const App: React.FC = () => {
  return (
    <Container>
      <SaveBook />
    </Container>
  );
}

export default App;
