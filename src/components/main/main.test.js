import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

jest.mock(`../../hocs/with-authorization/with-authorization.js`, () => () => `<div />`);
jest.mock(`../place-card/place-card.jsx`, () => `<div />`);

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
  }
];

it(`Main correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<Main
      city={places[0].city}
      cities={[places[0].city]}
      places={places}
      onChangeCity={jest.fn()}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
