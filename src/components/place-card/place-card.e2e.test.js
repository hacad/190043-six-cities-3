import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PlaceCard from "./place-card.jsx";

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
  bookmarked: false,
  location: {
    latitude: 52.370216,
    longitude: 4.895168
  }
};

Enzyme.configure({adapter: new Adapter()});

it(`Handler is called when click on header`, () => {
  const clickHandler = jest.fn();
  const placeCard = shallow(<PlaceCard
    place={testPlace}
    onClickHeader={clickHandler}
    onActivate={jest.fn()}
    onDeactivate={jest.fn()}
  />);

  const placeNameNode = placeCard.find(`h2.place-card__name`);
  placeNameNode.simulate(`click`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});

it(`Handler is called when card is hovered`, () => {
  const onActivateHandler = jest.fn();
  const onDeactivateHandler = jest.fn();
  const placeCard = shallow(<PlaceCard
    place={testPlace}
    onActivate={onActivateHandler}
    onDeactivate={onDeactivateHandler}
    onClickHeader={jest.fn()}
  />);

  const placeCardNode = placeCard.find(`.cities__place-card.place-card`);
  placeCardNode.simulate(`mouseenter`);

  expect(onActivateHandler).toHaveBeenCalledTimes(1);
});

it(`Active place is set correctly`, () => {
  const onActivateHandler = jest.fn();
  const onDeactivateHandler = jest.fn();
  const placeCard = shallow(<PlaceCard
    place={testPlace}
    onActivate={onActivateHandler}
    onDeactivate={onDeactivateHandler}
    onClickHeader={jest.fn()}
  />);

  const placeCardNode = placeCard.find(`.cities__place-card.place-card`);
  placeCardNode.simulate(`mouseenter`);

  expect(onActivateHandler).toHaveBeenCalledTimes(1);
  expect(onActivateHandler).toHaveBeenCalledWith(testPlace);
});

/* eslint-enable */
