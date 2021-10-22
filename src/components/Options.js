import { useState } from 'react';
import styled from 'styled-components';
import Picker from './Picker';
import Ratio from './Ratio';

const Container = styled.div`
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BrewButton = styled.button`
  padding: 1.5rem 2.5rem;
  font-size: 3rem;
  background-color: var(--color-red);
  border-radius: 2000px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
  border: none;
  color: rgba(255, 255, 255, 0.92);
  line-height: 1;
  font-family: 'Source Code Pro', monospace;
`;

export default function Options({ units, values, setValues, showBrewWindow }) {
  function incrementCoffee() {
    const tempValues = values;
    setValues({
      ...tempValues,
      coffee: tempValues.coffee + 1
    });
  }
  function decrementCoffee() {
    const tempValues = values;
    if (tempValues.coffee > 1) {
      setValues({
        ...tempValues,
        coffee: tempValues.coffee - 1
      });
    }
  }

  function incrementWater() {
    const tempValues = values;
    setValues({
      ...tempValues,
      water: tempValues.water + 50
    });
  }
  function decrementWater() {
    const tempValues = values;
    if (tempValues.water > 1) {
      setValues({
        ...tempValues,
        water: tempValues.water - 50
      });
    }
  }
  return (
    <>
      <Container>
        <Picker
          label="Coffee"
          value={values.coffee}
          unit={units.coffee}
          increment={incrementCoffee}
          decrement={decrementCoffee}
        />
        <Picker
          label="Water"
          value={values.water}
          unit={units.water}
          increment={incrementWater}
          decrement={decrementWater}
        />

        <Ratio values={values} />

        <BrewButton onClick={showBrewWindow}>Let's Brew!</BrewButton>
      </Container>
    </>
  );
}
