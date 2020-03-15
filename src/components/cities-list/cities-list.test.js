import React from 'react';
import renderer from 'react-test-renderer';
import CitiesList from './cities-list.jsx';

const mock = {
  city: {
    name: `Paris`,
    location: {
      latitude: 48.85341,
      longitude: 2.3488
    }
  },
  cities: [
    {
      name: `Paris`,
      location: {
        latitude: 48.85341,
        longitude: 2.3488
      }
    },
    {
      name: `Hamburg`,
      location: {
        latitude: 53.57532,
        longitude: 10.01534
      }
    }
  ]
};

it(`Cities List correctly renders`, () => {
  const {city, cities} = mock;

  const citiesList = renderer.create(
      <CitiesList
        activeCity={city}
        cities={cities}
        onChangeCity={jest.fn()}
        handleItemActivate={jest.fn()}
      />
  )
  .toJSON();

  expect(citiesList).toMatchSnapshot();
});
