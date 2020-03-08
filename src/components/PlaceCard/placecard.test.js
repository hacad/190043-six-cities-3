import React from 'react';
import renderer from 'react-test-renderer';
import PlaceCard from './placecard.jsx';

const testPlace = {
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
};

it(`PlaceCard correctly renders after relaunch`, () => {
  const placeCard = renderer
    .create(<PlaceCard
      place={testPlace}
      onClickHeader={jest.fn()}
      onActivate={jest.fn()}
      onDeactivate={jest.fn()}/>)
    .toJSON();

  expect(placeCard).toMatchSnapshot();
});
