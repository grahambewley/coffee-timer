import styled from 'styled-components';
import Label from './Label';

const RatioValue = styled.p`
  text-align: center;
  color: rgba(255, 255, 255, 0.85);
  font-size: 2rem;
  font-family: 'Source Code Pro', monospace;
  font-weight: bold;
  margin-top: 0.25rem;
  margin-bottom: 4rem;
`;

export default function Ratio({ values }) {
  return (
    <>
      <Label>Ratio</Label>
      <RatioValue>1:{(values.water / values.coffee).toFixed(1)}</RatioValue>
    </>
  );
}
