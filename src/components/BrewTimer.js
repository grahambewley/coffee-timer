/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import SmallButton from './SmallButton';
import TimeWeightIndicator from './TimeWeightIndicator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopwatch, faTint } from '@fortawesome/free-solid-svg-icons';

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
  padding: 0.5rem 0.5rem 1rem 0.5rem;
  background-color: #fafafa;
  border-radius: 4px;
  line-height: 1;
  border: 2px solid rgba(0, 0, 0, 0.05);
  position: relative;

  .label {
    text-transform: uppercase;
    color: var(--color-light-red);
    font-size: 1rem;
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

const Step = styled.div`
  padding: 1rem;
  background-color: #fafafa;
  border-radius: 4px;
  border: 2px solid rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
  transition: all 0.4s;

  p {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  & *:last-child {
    margin-bottom: 0;
  }

  &.active {
    border: 2px solid var(--color-faint-red);
  }
`;

const ButtonStepWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  gap: 1rem;
  margin-bottom: 3rem;

  &:not(.active) {
    color: var(--color-font-light);
  }
`;

const IndicatorWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

let timerInterval;

export default function BrewTimer({ options, values, units, bloomAmount }) {
  const [timerRunning, setTimerRunning] = useState(false);
  const [elapsedMilliseconds, setElapsedMilliseconds] = useState(0);

  const [displaySeconds, setDisplaySeconds] = useState(0);
  const [displayMinutes, setDisplayMinutes] = useState(0);

  const [currentStep, setCurrentStep] = useState(1); // pourBloom, letBloom, firstPour, secondPour

  const [displayWeight, setDisplayWeight] = useState(0);

  const pourEndSeconds = options.pours.map((pour, index) => {
    let dur = options.bloomDuration + pour.duration;
    if (index > 0) {
      for (let i = 0; i < index; i++) {
        dur += options.pours[i].duration;
      }
    }
    return dur;
  });

  const pourEndWeights = options.pours.map((pour, index) => {
    let wgt = 0;
    for (let i = 0; i <= index; i++) {
      wgt += options.pours[i].percentage * values.water;
    }
    return wgt;
  });

  // Millisecond timer side-effects
  useEffect(() => {
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);

    const displaySeconds = Math.floor((elapsedMilliseconds / 1000) % 60);
    const displayMinutes = Math.floor(elapsedMilliseconds / 1000 / 60);

    setDisplaySeconds(displaySeconds);
    setDisplayMinutes(displayMinutes);

    if (timerRunning && currentStep === 2) {
      setDisplayWeight(bloomAmount);
    }

    if (timerRunning && elapsedSeconds >= options.bloomDuration) {
      let tempCurrentStep = 3;

      // Set current step
      for (let i = 0; i < pourEndSeconds.length; i++) {
        if (elapsedSeconds >= pourEndSeconds[i]) {
          tempCurrentStep += 1;
        }
      }
      setCurrentStep(tempCurrentStep);

      // Set current weight
      let stepStartWeight = bloomAmount;
      let stepStartSeconds = options.bloomDuration;

      if (tempCurrentStep > 3) {
        stepStartWeight = pourEndWeights[tempCurrentStep - 4];
        stepStartSeconds = pourEndSeconds[tempCurrentStep - 4];
      }
      const stepEndWeight = pourEndWeights[tempCurrentStep - 3];
      const stepEndSeconds = pourEndSeconds[tempCurrentStep - 3];

      // Current weight = percentage of time passed * end weight
      const msIntoStep = elapsedMilliseconds - stepStartSeconds * 1000;
      const percentIntoStep =
        msIntoStep / ((stepEndSeconds - stepStartSeconds) * 1000);

      let thisStepWeightAdded = stepEndWeight - stepStartWeight;
      setDisplayWeight(stepStartWeight + percentIntoStep * thisStepWeightAdded);
    }
  }, [elapsedMilliseconds, pourEndSeconds]);

  useEffect(() => {
    if (currentStep > 2 + options.pours.length) {
      resetTimer();
      setDisplayWeight(values.water);
    }
  }, [currentStep]);

  function startTimer() {
    if (!timerRunning) {
      setTimerRunning(true);
      const start = Date.now();

      // Step 1 is pouring water to start
      // Step 2 is bloom time - move to this step
      if (currentStep === 1) {
        setCurrentStep(2);
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
      // setElapsedMilliseconds(0);
      clearInterval(timerInterval);
    }
  }

  function convertSeconds(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainderSeconds = seconds % 60;

    const timeString = `${minutes}:${remainderSeconds}`;

    return timeString;
  }

  let pourTotal = bloomAmount;
  let timeTotal = options.bloomDuration;

  return (
    <Container>
      <TimeWeightWrapper>
        <TimeWeightElement>
          <span className="label">Timer</span>
          <p className="value">
            {displayMinutes.toString().padStart(2, '0')}:
            {displaySeconds.toString().padStart(2, '0')}
          </p>
        </TimeWeightElement>
        <TimeWeightElement>
          <span className="label">Weight</span>
          <p className="value">{displayWeight.toFixed(1)}</p>
          <span className="small-unit">g/ml</span>
        </TimeWeightElement>
      </TimeWeightWrapper>

      <StepsHeader>Steps:</StepsHeader>
      <div>
        {/* Pour Bloom */}
        <Step className={currentStep === 1 && 'active'}>
          <p>
            Pour {bloomAmount}
            {units.water} water to begin bloom.
          </p>
        </Step>

        {/* Start Timer */}
        <ButtonStepWrapper className={currentStep === 1 && 'active'}>
          <SmallButton disabled={currentStep !== 1} onClick={startTimer}>
            Start Timer
          </SmallButton>
        </ButtonStepWrapper>

        {/* Let Bloom */}
        <Step className={currentStep === 2 && 'active'}>
          <p>Let cofffee bloom for {options.bloomDuration} seconds</p>
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
            <Step key={index} className={currentStep === index + 3 && 'active'}>
              <p>
                Pour {pourAmount}
                {units.water} of water in {pour.duration} seconds
              </p>
              <IndicatorWrapper>
                <TimeWeightIndicator>
                  <FontAwesomeIcon
                    icon={faTint}
                    color="var(--color-font-light)"
                  />
                  <span>{pourTotal + ' ' + units.water}</span>
                </TimeWeightIndicator>
                <TimeWeightIndicator>
                  <FontAwesomeIcon
                    icon={faStopwatch}
                    color="var(--color-font-light)"
                  />
                  <span>{convertSeconds(timeTotal)}</span>
                </TimeWeightIndicator>
              </IndicatorWrapper>
            </Step>
          );
        })}
      </div>
    </Container>
  );
}
