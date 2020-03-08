import React from "react";
import renderer from "react-test-renderer";
import PlacesList from "./places-list.jsx";

/* eslint-disable camelcase */

const places = [
  {
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
    preview_image: `img/apartment-01.jpg`,
    is_premium: false,
    title: `Beautiful &amp; luxurious apartment at great location`,
    price: 120,
    rating: 93,
    bookmarked: false,
    location: {
      latitude: 52.370216,
      longitude: 4.895168
    }
  }
];

it(`PlacesList correctly renders after relaunch`, () => {
  const placesList = renderer
    .create(<PlacesList
      places={places}
      onClickCardHeader={jest.fn()}
      onActivateItem={jest.fn()}
      onDeactivateItem={jest.fn()}/>)
    .toJSON();

  expect(placesList).toMatchSnapshot();
});

/* eslint-enable */
