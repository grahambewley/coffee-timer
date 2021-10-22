import './App.css';
import styled from 'styled-components';
import Options from './components/Options';

const Container = styled.div`
  padding: 4rem 2rem;
`;

function App() {
  return (
    <Container>
      <Options />
    </Container>
  );
}

export default App;
