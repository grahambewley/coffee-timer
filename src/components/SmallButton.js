import styled from 'styled-components';

const Button = styled.button`
  padding: 1rem 2rem;
  font-size: 1.6rem;
  background-color: var(--color-red);
  border-radius: 2000px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  border: none;
  color: rgba(255, 255, 255, 0.92);
  line-height: 1;
  font-family: 'Source Code Pro', monospace;

  &.disabled {
    background-color: #ddd;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  }
`;

export default function SmallButton({ children, onClick, disabled }) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={disabled && 'disabled'}
    >
      {children}
    </Button>
  );
}
