import { useState } from 'react';
import styled from 'styled-components';
import BrewPreview from './BrewPreview';
import BrewTimer from './BrewTimer';

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
const Header = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  position: relative;
  background-color: #fafafa;

  h2 {
    font-size: 2.4rem;
    font-weight: 400;
    letter-spacing: 2px;
    color: var(--color-font-medium);
  }
`;
const CloseButton = styled.button`
  position: absolute;
  left: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  background-color: white;
  border: none;
  text-align: left;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #444;
  font-weight: bold;
  font-size: 1.5rem;
`;

export default function BrewWindow({ values, options, units, hideBrewWindow }) {
  // const [showPreview, setShowPreview] = useState(true);
  const [showTimer, setShowTimer] = useState(false);

  const bloomAmount = options.bloomRatio * values.coffee;

  return (
    <FixedWrapper>
      <Container>
        <Header>
          <CloseButton onClick={hideBrewWindow}>&#8592;</CloseButton>
          <h2>{showTimer ? 'Timer' : 'Preview'}</h2>
        </Header>
        {!showTimer ? (
          <BrewPreview
            options={options}
            values={values}
            units={units}
            bloomAmount={bloomAmount}
            showTimer={() => setShowTimer(true)}
          />
        ) : (
          <BrewTimer
            options={options}
            values={values}
            units={units}
            bloomAmount={bloomAmount}
          />
        )}
      </Container>
    </FixedWrapper>
  );
}
