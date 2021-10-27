import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCoffee,
  faStopwatch,
  faTint
} from '@fortawesome/free-solid-svg-icons';
import BigButton from './BigButton';

const Container = styled.div`
  padding: 2rem;
  padding-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;
const PreviewWrapper = styled.div`
  display: flex;
  margin-bottom: 4rem;
  gap: 1rem;
`;
const PreviewItem = styled.div`
  flex: 1 0 0;
  font-weight: bold;
  padding: 3px 5px;
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

  p {
    font-size: 2rem;
    font-family: var(--font-monospace);
    text-align: center;
  }

  .item-unit {
    font-size: 1.2rem;
    color: var(--color-font-medium);
  }
`;
const InstructionWrapper = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #fafafa;
  border-radius: 4px;
  border: 2px solid rgba(0, 0, 0, 0.05);

  & *:last-child {
    margin-bottom: 0;
  }
`;
const Label = styled.p`
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid rgba(0, 0, 0, 0.05);
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--color-font-medium);
  font-size: 1.4rem;
  font-weight: bold;
`;
const Instruction = styled.p`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
`;
const InstructionHighlight = styled.span`
  font-weight: bold;
`;

const TimeWeightIndicatorWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const TimeWeightLabel = styled.p`
  text-transform: uppercase;
  color: var(--color-font-medium);
  letter-spacing: 1px;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;
const TimeWeightIndicator = styled.div`
  padding: 0.5rem;
  background-color: #fff;
  border-radius: 4px;
  line-height: 1;
  border: 2px solid rgba(0, 0, 0, 0.05);

  span {
    text-transform: uppercase;
    color: var(--color-font-medium);
    letter-spacing: 1px;
    font-size: 1.2rem;
    font-weight: bold;
    margin-left: 4px;
  }
`;

export default function BrewPreview({
  options,
  values,
  units,
  showTimer,
  bloomAmount,
  firstPour,
  secondPour
}) {
  function convertSeconds(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainderSeconds = seconds % 60;

    const timeString = `${minutes}:${remainderSeconds}`;

    return timeString;
  }

  return (
    <Container>
      <PreviewWrapper>
        <PreviewItem>
          <span className="label">Coffee</span>
          <p>
            <span className="item-value">{values.coffee}</span>
            <span className="item-unit">{units.coffee}</span>
          </p>
        </PreviewItem>
        <PreviewItem>
          <span className="label">Water</span>
          <p>
            <span className="item-value">{values.water}</span>
            <span className="item-unit">{units.water}</span>
          </p>
        </PreviewItem>
        <PreviewItem>
          <span className="label">Ratio</span>
          <p>
            <span className="item-value">
              1:{(values.water / values.coffee).toFixed(1)}
            </span>
          </p>
        </PreviewItem>
      </PreviewWrapper>
      <InstructionWrapper>
        <Label>Bloom</Label>
        <Instruction>
          <InstructionHighlight>
            {bloomAmount}
            {units.water}
          </InstructionHighlight>{' '}
          of water for{' '}
          <InstructionHighlight>
            {options.bloomDuration} seconds
          </InstructionHighlight>
        </Instruction>
      </InstructionWrapper>

      <InstructionWrapper>
        <Label>First Pour</Label>
        <Instruction>
          <InstructionHighlight>
            {firstPour}
            {units.water}
          </InstructionHighlight>{' '}
          of water in <InstructionHighlight> 30 seconds</InstructionHighlight>
        </Instruction>
        <TimeWeightLabel>Total:</TimeWeightLabel>
        <TimeWeightIndicatorWrapper>
          <TimeWeightIndicator>
            <FontAwesomeIcon icon={faTint} color="var(--color-font-light)" />
            <span>{bloomAmount + firstPour + ' ' + units.water}</span>
          </TimeWeightIndicator>
          <TimeWeightIndicator>
            <FontAwesomeIcon
              icon={faStopwatch}
              color="var(--color-font-light)"
            />
            <span>{convertSeconds(options.bloomDuration + 30)}</span>
          </TimeWeightIndicator>
        </TimeWeightIndicatorWrapper>
      </InstructionWrapper>

      <InstructionWrapper>
        <Label>Then Pour</Label>
        <Instruction>
          <InstructionHighlight>
            {secondPour}
            {units.water}
          </InstructionHighlight>{' '}
          of water in <InstructionHighlight> 30 seconds</InstructionHighlight>
        </Instruction>
        <TimeWeightLabel>Total:</TimeWeightLabel>
        <TimeWeightIndicatorWrapper>
          <TimeWeightIndicator>
            <FontAwesomeIcon icon={faTint} color="var(--color-font-light)" />
            <span>
              {bloomAmount + firstPour + secondPour + ' ' + units.water}
            </span>
          </TimeWeightIndicator>
          <TimeWeightIndicator>
            <FontAwesomeIcon
              icon={faStopwatch}
              color="var(--color-font-light)"
            />
            <span>{convertSeconds(options.bloomDuration + 60)}</span>
          </TimeWeightIndicator>
        </TimeWeightIndicatorWrapper>
      </InstructionWrapper>
      <BigButton onClick={showTimer}>Let's Brew!</BigButton>
    </Container>
  );
}
