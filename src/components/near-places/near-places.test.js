import React from "react";
import renderer from "react-test-renderer";
import NearPlaces from "./near-places.jsx";

jest.mock(`../place-card/place-card.jsx`, () => `<div />`);

it(`NearPlaces correctly renders after relaunch`, () => {
  const places = [{
    id: 15,
    city: {
      name: `Hamburg`,
      location: {
        latitude: 53.552645,
        longitude: 9.966287,
        zoom: 10
      }
    },
    type: `apartment`,
    previewImage: `img/apartment-03.jpg`,
    isPremium: false,
    title: `Nice, cozy, warm big bed apartment`,
    price: 180,
    rating: 100,
    isFavorite: false,
    location: {
      latitude: 53.554221,
      longitude: 9.992588
    }
  }];

  const activeItem = {
    id: 16,
    city: {
      name: `Paris`,
      location: {
        latitude: 48.856663,
        longitude: 2.351556,
        zoom: 10
      }
    },
    type: `apartment`,
    previewImage: `img/apartment-02.jpg`,
    isPremium: false,
    title: `Nice, cozy, warm big bed apartment`,
    price: 300,
    rating: 100,
    isFavorite: false,
    location: {
      latitude: 48.845933,
      longitude: 2.357839
    }
  };

  const nearPlaces = renderer.create(
      <NearPlaces
        places={places}
        activeCity={activeItem.city}
        currentOfferLocation={activeItem.location}
        activeItem={activeItem}
        onActivateItem={jest.fn()}
        onDeactivateItem={jest.fn()}
      />
  ).toJSON();

  // Act & Assert
  expect(nearPlaces).toMatchSnapshot();
});
