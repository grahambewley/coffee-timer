import styled from 'styled-components';

const Indicator = styled.div`
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

export default function TimeWeightIndicator({ children }) {
  return <Indicator>{children}</Indicator>;
}
