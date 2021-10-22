import './App.css';
import { useState } from 'react';
import styled from 'styled-components';
import Options from './components/Options';
import BrewWindow from './components/BrewWindow';

const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Header = styled.header`
  background-color: rgba(255, 255, 255, 0.8);
  font-family: 'Source Code Pro', monospace;
  text-align: center;
  color: #362d28;
  padding: 1rem 0;
  position: fixed;
  top: 0;
  width: 100%;
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
  const [options, setOptions] = useState({
    bloomRatio: 2, // water-to-coffee ratio for blooming
    bloomDuration: 45 // in seconds
  });

  return (
    <AppWrapper>
      <Header>
        <h1>Time For Coffee!</h1>
      </Header>
      <Options
        units={units}
        values={values}
        setValues={setValues}
        showBrewWindow={() => setBrewWindowShowing(true)}
      />
      {brewWindowShowing && (
        <BrewWindow
          values={values}
          units={units}
          options={options}
          hideBrewWindow={() => setBrewWindowShowing(false)}
        />
      )}
    </AppWrapper>
  );
}

export default App;
