import styled from 'styled-components';

const LabelStyles = styled.p`
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 1.2rem;
  font-weight: bold;
`;

export default function Label(props) {
  return <LabelStyles>{props.children}</LabelStyles>;
}
