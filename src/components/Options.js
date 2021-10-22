import { useState } from 'react';
import Picker from './Picker';

export default function Options() {
  const [units] = useState({
    coffee: 'g',
    water: 'ml'
  });
  const [values, setValues] = useState({
    coffee: 15,
    water: 250
  });

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
      <div>
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
      </div>
    </>
  );
}
