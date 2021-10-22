import styled from 'styled-components';

const Container = styled.div`
  padding: 4rem 2rem;
`;
const Label = styled.p`
  padding-bottom: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-left: 5px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 1.2rem;
  font-weight: bold;
`;
const Instruction = styled.p`
  font-size: 1.6rem;
  margin-bottom: 6rem;
`;
const InstructionHighlight = styled.span`
  font-weight: bold;
  padding: 3px 5px;
  background-color: #fafafa;
  border-radius: 4px;
  line-height: 1;
  border: 2px solid rgba(0, 0, 0, 0.05);
`;
export default function BrewPreview({ options, values, units }) {
  const bloomAmount = options.bloomRatio * values.coffee;

  const firstPour = values.water * 0.6 - bloomAmount;
  const secondPour = values.water * 0.4;
  return (
    <Container>
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

      <Label>Then Pour</Label>
      <Instruction>
        <InstructionHighlight>
          {firstPour}
          {units.water}
        </InstructionHighlight>{' '}
        of water over <InstructionHighlight> 30 seconds</InstructionHighlight>
      </Instruction>

      <Label>Then Pour</Label>
      <Instruction>
        <InstructionHighlight>
          {secondPour}
          {units.water}
        </InstructionHighlight>{' '}
        of water over <InstructionHighlight> 30 seconds</InstructionHighlight>
      </Instruction>
    </Container>
  );
}
