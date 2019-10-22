import React from 'react';
import renderer from 'react-test-renderer';
import PlaceCard from './placecard';

it(`PlaceCard correctly renders after relaunch`, () => {
  const placeCard = renderer
    .create(<PlaceCard
      placeName={`test place`}
      onClickHeader={jest.fn()} />)
    .toJSON();

  expect(placeCard).toMatchSnapshot();
});
