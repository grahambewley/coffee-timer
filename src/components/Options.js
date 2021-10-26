import styled from 'styled-components';
import Picker from './Picker';
import Ratio from './Ratio';
import BigButton from './BigButton';

const Container = styled.div`
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
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

        <BigButton onClick={showBrewWindow}>Let's Brew!</BigButton>
      </Container>
    </>
  );
}
