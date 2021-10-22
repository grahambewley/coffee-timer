import styled from 'styled-components';

const FixedWrapper = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  padding: 1.5rem;
  background-color: rgba(0, 0, 0, 0.85);
`;
const Container = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
`;

export default function BrewWindow() {
  return (
    <FixedWrapper>
      <Container>
        <p>Hello</p>
      </Container>
    </FixedWrapper>
  );
}
