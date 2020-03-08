import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter as Router} from "react-router-dom";
import {Favorites} from "./favorites.jsx";

jest.mock(`../../hocs/with-authorization/with-authorization.js`, () => () => `<div />`);

const favorites = [{
  city: {
    name: `Amsterdam`,
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10
    }
  },
  places: [
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
      isFavorite: true,
      location: {
        latitude: 52.370216,
        longitude: 4.895168
      }
    }
  ]
}];

it(`Favorites empty correctly renders after relaunch`, () => {
  // Arrange && Act
  const favoritesPage = renderer.create(
      <Router>
        <Favorites favorites={[]} loadFavorites={jest.fn()}/>
      </Router>).toJSON();

  // Assert
  expect(favoritesPage).toMatchSnapshot();
});


it(`Favorites not empty correctly renders after relaunch`, () => {
  // Arrange && Act
  const favoritesPage = renderer.create(
      <Router>
        <Favorites favorites={favorites} loadFavorites={jest.fn()}/>
      </Router>).toJSON();

  // Assert
  expect(favoritesPage).toMatchSnapshot();
});
