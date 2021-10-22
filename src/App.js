import './App.css';
import { useState } from 'react';
import styled from 'styled-components';
import Options from './components/Options';
import BrewWindow from './components/BrewWindow';

const Header = styled.header`
  background-color: rgba(255, 255, 255, 0.8);
  font-family: 'Source Code Pro', monospace;
  text-align: center;
  color: #362d28;
  padding: 0.5rem 0;
`;

function App() {
  const [brewWindowShowing, setBrewWindowShowing] = useState(false);

  const [units, setUnits] = useState({
    coffee: 'g',
    water: 'ml'
  });
  const [values, setValues] = useState({
    coffee: 15,
    water: 250
  });

  return (
    <>
      <Header>
        <h1>Time For Coffee!</h1>
      </Header>
      <Options
        units={units}
        values={values}
        setValues={setValues}
        showBrewWindow={() => setBrewWindowShowing(true)}
      />
      {brewWindowShowing && <BrewWindow />}
    </>
  );
}

export default App;
