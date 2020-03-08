import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

const cityPlaces = [
  {
    id: 1,
    type: `Apartment`,
    img: `img/apartment-01.jpg`,
    category: `Premium`,
    name: `Beautiful &amp; luxurious apartment at great location`,
    price: {
      value: 120,
      currency: `€`
    },
    rating: 93,
    bookmarked: false
  }
];

it(`App correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<App
      cityPlaces={cityPlaces}
      onClickHeader={jest.fn()}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

