import React from 'react';
import renderer from 'react-test-renderer';
import PlaceList from './placelist';

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

it(`PlaceList correctly renders after relaunch`, () => {
  const placeList = renderer
    .create(<PlaceList
      cityPlaces={cityPlaces}
      onClickCardHeader={jest.fn()}/>)
    .toJSON();

  expect(placeList).toMatchSnapshot();
});
