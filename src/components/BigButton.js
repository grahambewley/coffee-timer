import styled from 'styled-components';

const Button = styled.button`
  padding: 1.5rem 2.5rem;
  font-size: 3rem;
  background-color: var(--color-red);
  border-radius: 2000px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  border: none;
  color: rgba(255, 255, 255, 0.92);
  line-height: 1;
  font-family: 'Source Code Pro', monospace;
`;

export default function BigButton({ children, onClick }) {
  return <Button onClick={onClick}>{children}</Button>;
}
