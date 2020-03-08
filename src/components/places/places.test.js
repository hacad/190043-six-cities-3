import React from "react";
import renderer from "react-test-renderer";
import Places from "./places.jsx";

// jest.mock(`../../hocs/with-active-item/with-active-item.js`, () => () => `<div />`);

jest.mock(`../place-card/place-card.jsx`, () => `<div />`);

it(`Places correctly renders after relaunch`, () => {
  // Arrange
  const sortedItems = [{
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

  const places = renderer.create(
      <Places
        sortedItems={sortedItems}
        className="cities__places-list places__list tabs__content"
        onClickCardHeader={jest.fn()}
        activeItem={activeItem}
        onActivateItem={jest.fn()}
        onDeactivateItem={jest.fn()}
        onChangeSorting={jest.fn()}
        activeCity={activeItem.city}
      />
  );

  // Act & Assert
  expect(places).toMatchSnapshot();
});
