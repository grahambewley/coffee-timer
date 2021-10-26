import styled from 'styled-components';
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
  margin-bottom: 3rem;
`;
const Label = styled.p`
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
const Instruction = styled.p`
  font-size: 1.8rem;
  margin-bottom: 2rem;
`;
const InstructionHighlight = styled.span`
  font-weight: bold;
`;
const WeightLabel = styled.p`
  padding-left: 5px;
  text-transform: uppercase;
  color: var(--color-font-medium);
  letter-spacing: 1px;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;
const WeightLabelHighlight = styled.span`
  font-weight: bold;
  padding: 1px 3px;
  color: #222;
  background-color: #fafafa;
  border-radius: 4px;
  line-height: 1;
  border: 2px solid rgba(0, 0, 0, 0.05);
`;

export default function BrewPreview({ options, values, units, showTimer }) {
  const bloomAmount = options.bloomRatio * values.coffee;

  const firstPour = values.water * 0.6 - bloomAmount;
  const secondPour = values.water * 0.4;

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
          of water over <InstructionHighlight> 30 seconds</InstructionHighlight>
        </Instruction>
        <WeightLabel>
          Total:{' '}
          <WeightLabelHighlight>
            {bloomAmount + firstPour + ' ' + units.water}
          </WeightLabelHighlight>{' '}
          After{' '}
          <WeightLabelHighlight>
            {convertSeconds(options.bloomDuration + 30)}
          </WeightLabelHighlight>
        </WeightLabel>
      </InstructionWrapper>

      <InstructionWrapper>
        <Label>Then Pour</Label>
        <Instruction>
          <InstructionHighlight>
            {secondPour}
            {units.water}
          </InstructionHighlight>{' '}
          of water over <InstructionHighlight> 30 seconds</InstructionHighlight>
        </Instruction>
        <WeightLabel>
          Total:{' '}
          <WeightLabelHighlight>
            {bloomAmount + firstPour + secondPour + ' ' + units.water}
          </WeightLabelHighlight>{' '}
          After{' '}
          <WeightLabelHighlight>
            {convertSeconds(options.bloomDuration + 60)}
          </WeightLabelHighlight>
        </WeightLabel>
      </InstructionWrapper>
      <BigButton onClick={showTimer}>Go To Timer</BigButton>
    </Container>
  );
}
