import styled from 'styled-components';
import { useState } from 'react';

const Container = styled.div`
  margin-bottom: 3rem;
`;

const Label = styled.p`
  color: #f1f1f1;
  text-align: center;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;
const PickerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;
const IncButton = styled.button`
  background: white;
  outline: none;
  border: none;
  border-radius: 10px;
  font-size: 2rem;
  font-family: monospace;
  font-weight: bold;
  padding: 0.25rem 0.75rem;
`;
const DisplayContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 10px;
  padding: 0.25rem 0.75rem;
  width: max-content;
  position: relative;
`;
const Value = styled.span`
  font-size: 4rem;
  font-weight: 600;
  font-family: monospace;
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
