import { useState, useEffect } from 'react';
import styled from 'styled-components';
import SmallButton from './SmallButton';

const Container = styled.div`
  padding: 2rem;
`;
const TimeWeightWrapper = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 4rem;
`;
const TimeWeightElement = styled.div`
  flex: 1 0 0;
  padding: 0.5rem;
  background-color: #fafafa;
  border-radius: 4px;
  line-height: 1;
  border: 2px solid rgba(0, 0, 0, 0.05);

  .label {
    text-transform: uppercase;
    color: var(--color-light-red);
    font-size: 0.8rem;
    font-weight: bold;
    display: block;
    text-align: center;
    letter-spacing: 2px;
    margin-bottom: 0.5rem;
  }

  .value {
    text-align: center;
    font-family: var(--font-monospace);
    font-size: 3.6rem;
  }
`;

const StepsHeader = styled.p`
  padding-bottom: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-left: 5px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--color-font-medium);
  font-size: 1.4rem;
  font-weight: bold;
`;
const StepsWrapper = styled.div``;
const Step = styled.p`
  font-size: 1.8rem;
  margin-bottom: 2rem;
  transform-origin: left;
  transition: all 0.4s;

  &:not(.active) {
    color: var(--color-font-light);
    filter: blur(0.5px);
    transform: scale(0.9);
  }
`;
const ButtonStepWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  gap: 1rem;
  margin-bottom: 2rem;

  &:not(.active) {
    color: var(--color-font-light);
  }
`;
let timerInterval;

export default function BrewTimer({
  options,
  values,
  units,
  bloomAmount,
  firstPour,
  secondPour
}) {
  const [timerRunning, setTimerRunning] = useState(false);
  const [elapsedMilliseconds, setElapsedMilliseconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [currentStep, setCurrentStep] = useState(1); // pourBloom, letBloom, firstPour, secondPour

  useEffect(() => {
    let seconds = Math.floor((elapsedMilliseconds / 1000) % 60);
    let minutes = Math.floor(elapsedMilliseconds / 1000 / 60);

    setSeconds(seconds);
    setMinutes(minutes);
  }, [elapsedMilliseconds]);

  function nextStep() {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  }

  function startTimer() {
    if (!timerRunning) {
      setTimerRunning(true);
      const start = Date.now();

      if (currentStep === 1) {
        nextStep();
      }

      timerInterval = setInterval(() => {
        const current = Date.now();
        const elapsed = current - start;
        setElapsedMilliseconds(elapsed);
      }, 50);
    }
  }

  function resetTimer() {
    if (timerRunning) {
      setTimerRunning(false);
      setElapsedMilliseconds(0);
      clearInterval(timerInterval);
    }
  }

  return (
    <Container>
      <TimeWeightWrapper>
        <TimeWeightElement>
          <span className="label">Timer</span>
          <p className="value">
            {minutes.toString().padStart(2, '0')}:
            {seconds.toString().padStart(2, '0')}
          </p>
        </TimeWeightElement>
        <TimeWeightElement>
          <span className="label">Weight</span>
          <p className="value">000</p>
        </TimeWeightElement>
      </TimeWeightWrapper>

      <StepsHeader>Steps:</StepsHeader>
      <StepsWrapper>
        {/* Pour Bloom */}
        <Step className={currentStep === 1 && 'active'}>
          Pour {bloomAmount}
          {units.water} water to begin bloom.
        </Step>

        {/* Start Timer */}
        <ButtonStepWrapper className={currentStep === 1 && 'active'}>
          <SmallButton disabled={currentStep !== 1} onClick={startTimer}>
            Start Timer
          </SmallButton>
        </ButtonStepWrapper>
        {/* Let Bloom */}
        <Step className={currentStep === 2 && 'active'}>
          Let cofffee bloom for {options.bloomDuration} seconds
        </Step>

        {/* First Pour */}
        <Step className={currentStep === 3 && 'active'}>
          Pour {firstPour}
          {units.water} of water in 30 seconds
        </Step>
        {/* Second Pour */}
        <Step className={currentStep === 4 && 'active'}>
          Pour {secondPour}
          {units.water} of water in 30 seconds
        </Step>
      </StepsWrapper>
    </Container>
  );
}
