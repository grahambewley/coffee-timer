/* eslint-disable react-hooks/exhaustive-deps */
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
  position: relative;

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

  .small-unit {
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
    font-size: 1.2em;
    color: var(--color-font-light);
    font-family: var(--font-monospace);
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

const TimedStep = Step;
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

export default function BrewTimer({ options, values, units, bloomAmount }) {
  const [timerRunning, setTimerRunning] = useState(false);
  const [elapsedMilliseconds, setElapsedMilliseconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [currentStep, setCurrentStep] = useState(1); // pourBloom, letBloom, firstPour, secondPour
  const [currentWeight, setCurrentWeight] = useState(0);

  useEffect(() => {
    const seconds = Math.floor(elapsedMilliseconds / 1000);
    const displaySeconds = Math.floor((elapsedMilliseconds / 1000) % 60);
    const displayMinutes = Math.floor(elapsedMilliseconds / 1000 / 60);

    setSeconds(displaySeconds);
    setMinutes(displayMinutes);

    // If timer is running but is within bloom time, show bloom weight
    if (timerRunning && seconds <= options.bloomDuration) {
      setCurrentWeight(bloomAmount);
    }
    // Timer greater than bloom but less than bloom + 30
    else if (
      seconds > options.bloomDuration &&
      seconds <= options.bloomDuration + 30
    ) {
      setCurrentStep(3);
      // Determine weight
    }
    // Timer greater than bloom + 30 but less than bloom + 60
    else if (
      seconds > options.bloomDuration + 30 &&
      seconds <= options.bloomDuration + 60
    ) {
      setCurrentStep(4);
      // Determine weight
    } else {
      resetTimer();
    }
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

  let pourTotal = bloomAmount;
  let timeTotal = options.bloomDuration;

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
          <p className="value">{currentWeight}</p>
          <span className="small-unit">g/ml</span>
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

        {/* Pours */}
        {options.pours.map((pour, index) => {
          let pourAmount = values.water * pour.percentage;
          if (index === 0) {
            pourAmount -= bloomAmount;
          }

          pourTotal += pourAmount;
          timeTotal += pour.duration;

          return (
            <TimedStep className={currentStep === index + 3 && 'active'}>
              Pour {pourAmount}
              {units.water} of water in {pour.duration} seconds
            </TimedStep>
          );
        })}
      </StepsWrapper>
    </Container>
  );
}
