import React from 'react';
import renderer from 'react-test-renderer';
import App from './app';

const cityPlaces = [
  `Beautiful &amp; luxurious apartment at great location`,
  `Wood and stone place`,
  `Canal View Prinsengracht`,
  `Nice, cozy, warm big bed apartment`
];

it(`App correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<App
      cityPlaces={cityPlaces}
      onClickHeader={jest.fn()}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

