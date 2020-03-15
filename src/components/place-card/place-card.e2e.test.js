import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PlaceCard from "./place-card.jsx";

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
  starRating: 93,
  isFavorite: false,
  location: {
    latitude: 52.370216,
    longitude: 4.895168
  }
};

Enzyme.configure({adapter: new Adapter()});

it(`Handler is called when click on header`, () => {
  // Arrange
  const clickHandler = jest.fn();
  const placeCard = shallow(<PlaceCard
    place={testPlace}
    handleClickHeader={clickHandler}
    handleActivate={jest.fn()}
    handleDeactivate={jest.fn()}
    articleTagClassNamePrefix="cities__place-card"
    divImageWrapperClassNamePrefix="cities__image-wrapper"
    divInfoClassNamePrefix=""
  />);

  // Act
  const placeNameNode = placeCard.find(`h2.place-card__name`);
  placeNameNode.simulate(`click`);

  // Assert
  expect(clickHandler).toHaveBeenCalledTimes(1);
});

it(`Handler is called when card is hovered`, () => {
  // Arrange
  const handleActivateHandler = jest.fn();
  const handleDeactivateHandler = jest.fn();
  const placeCard = shallow(<PlaceCard
    place={testPlace}
    handleActivate={handleActivateHandler}
    handleDeactivate={handleDeactivateHandler}
    handleClickHeader={jest.fn()}
    articleTagClassNamePrefix="cities__place-card"
    divImageWrapperClassNamePrefix="cities__image-wrapper"
    divInfoClassNamePrefix=""
  />);

  // Act
  const placeCardNode = placeCard.find(`.cities__place-card.place-card`);
  placeCardNode.simulate(`mouseenter`);

  // Assert
  expect(handleActivateHandler).toHaveBeenCalledTimes(1);
});

it(`Active place is set correctly`, () => {
  // Arrange
  const handleActivateHandler = jest.fn();
  const handleDeactivateHandler = jest.fn();
  const placeCard = shallow(<PlaceCard
    place={testPlace}
    handleActivate={handleActivateHandler}
    handleDeactivate={handleDeactivateHandler}
    handleClickHeader={jest.fn()}
    articleTagClassNamePrefix="cities__place-card"
    divImageWrapperClassNamePrefix="cities__image-wrapper"
    divInfoClassNamePrefix=""
  />);

  // Act
  const placeCardNode = placeCard.find(`.cities__place-card.place-card`);
  placeCardNode.simulate(`mouseenter`);

  // Assert
  expect(handleActivateHandler).toHaveBeenCalledTimes(1);
  expect(handleActivateHandler).toHaveBeenCalledWith(testPlace);
});
