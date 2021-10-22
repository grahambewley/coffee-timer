import styled from 'styled-components';
import BrewPreview from './BrewPreview';

const FixedWrapper = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.85);
`;
const Container = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
`;
const CloseButton = styled.button`
  width: 100%;
  padding: 1.5rem;
  border: none;
  text-align: left;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #444;
  font-weight: bold;
  font-size: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`;

export default function BrewWindow({ values, options, units, hideBrewWindow }) {
  return (
    <FixedWrapper>
      <Container>
        <CloseButton onClick={hideBrewWindow}>
          &#8592; Back to Setup
        </CloseButton>
        <BrewPreview options={options} values={values} units={units} />
      </Container>
    </FixedWrapper>
  );
}
