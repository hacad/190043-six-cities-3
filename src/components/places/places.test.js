import React from "react";
import renderer from "react-test-renderer";
import {Places} from "./places.jsx";
import {defaultSortingOptionItem} from "../../mocks/places-sorting-options.js";

jest.mock(`../place-card/place-card.jsx`, () => `<div />`);

it(`Places correctly renders after relaunch`, () => {
  // Arrange
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

  const activeOffer = {
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

  const placesComponent = renderer.create(
      <Places
        places={places}
        className="cities__places-list places__list tabs__content"
        handleClickCardHeader={jest.fn()}
        activeOffer={activeOffer}
        handleItemActivate={jest.fn()}
        handleItemDeactivate={jest.fn()}
        handleSortingChange={jest.fn()}
        activeCity={activeOffer.city}
        selectedItem={defaultSortingOptionItem}
      />
  );

  // Act & Assert
  expect(placesComponent).toMatchSnapshot();
});
