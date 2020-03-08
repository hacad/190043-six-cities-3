import React from "react";
import renderer from "react-test-renderer";
import {PlaceCard} from "./place-card.jsx";

/* eslint-disable camelcase */

const testPlace = {
  id: 1,
  city: {
    name: `Amsterdam`,
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10
    }
  },
  type: `apartment`,
  previewImage: `img/apartment-01.jpg`,
  isPremium: false,
  title: `Beautiful &amp; luxurious apartment at great location`,
  price: 120,
  rating: 93,
  isFavorite: false,
  location: {
    latitude: 52.370216,
    longitude: 4.895168
  }
};

it(`PlaceCard correctly renders after relaunch`, () => {
  const placeCard = renderer
    .create(<PlaceCard
      place={testPlace}
      onClickHeader={jest.fn()}
      onActivate={jest.fn()}
      onDeactivate={jest.fn()}
      toggleFavorite={jest.fn()}/>)
    .toJSON();

  expect(placeCard).toMatchSnapshot();
});

/* eslint-enable */
