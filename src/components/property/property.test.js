import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter as Router} from "react-router-dom";
import {Property} from "./property.jsx";

jest.mock(`../../hocs/with-authorization/with-authorization.js`, () => () => `<div />`);

const testProperty = {
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
  images: [`1.jpg`, `2.jpg`, `3.jpg`],
  isPremium: false,
  title: `Beautiful &amp; luxurious apartment at great location`,
  price: 120,
  rating: 93,
  isFavorite: false,
  goods: [`Coffee machine`, `Wi-Fi`],
  host: {
    id: 25,
    name: `Angelina`,
    isPro: true,
    avatarUrl: `img/avatar-angelina.jpg`
  },
  location: {
    latitude: 52.370216,
    longitude: 4.895168
  }
};

it(`Property correctly renders after relaunch`, () => {
  const offer = testProperty;

  const property = renderer.create(
      <Router>
        <Property offer={offer} />
      </Router>).toJSON();

  expect(property).toMatchSnapshot();
});
