import styled from 'styled-components';
import Label from './Label';

const Container = styled.div`
  margin-bottom: 4rem;
`;

const PickerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
`;
const IncButton = styled.button`
  background: rgba(255, 255, 255, 0.8);
  outline: none;
  border: none;
  border-radius: 10px;
  font-size: 3rem;
  line-height: 1;
  font-family: 'Source Code Pro', monospace;
  font-weight: bold;
  padding: 0.25rem 0.75rem;
`;
const DisplayContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  padding: 0.25rem 0.75rem;
  width: max-content;
  position: relative;
`;
const Value = styled.span`
  font-size: 5rem;
  font-weight: 600;
  font-family: 'Source Code Pro', monospace;
  text-align: center;
  line-height: 1;
  white-space: nowrap;
`;
const Unit = styled.span`
  font-weight: 800;
  font-family: monospace;
  font-size: 1.6rem;
`;

export default function Picker({ label, value, unit, increment, decrement }) {
  return (
    <Container>
      <Label>{label}</Label>
      <PickerWrapper>
        <IncButton onClick={decrement}>&#8722;</IncButton>
        <DisplayContainer>
          <Value>{value}</Value>
          <Unit>{unit}</Unit>
        </DisplayContainer>
        <IncButton onClick={increment}>&#43;</IncButton>
      </PickerWrapper>
    </Container>
  );
}
