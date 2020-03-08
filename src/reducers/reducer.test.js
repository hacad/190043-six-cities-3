import {reducer, ActionCreator} from "./reducer.js";
import {default as mockOffers} from "../mocks/offers.js";

it(`Reducer should return initial state by default`, () => {
  // Arrange
  const initialState = {
    city: {name: `Amsterdam`, location: {latitude: 52.38333, longitude: 4.9}},
    offers: mockOffers.filter((cp) => cp.city.name === `Amsterdam`),
    allOffers: mockOffers
  };

  // Act
  const reducerIntialState = reducer(undefined, {});

  // Assert
  expect(reducerIntialState.city.name).toEqual(initialState.city.name);
  expect(reducerIntialState.offers).toEqual(initialState.offers);
});

it(`Reducer should change city and offers`, () => {
  // Arrange
  const currentState = {
    city: {
      name: `Amsterdam`
    },
    offers: mockOffers.filter((cp) => cp.city.name === `Amsterdam`)
  };

  const requiredState = {
    city: {
      name: `Paris`
    },
    offers: mockOffers.filter((cp) => cp.city.name === `Paris`)
  };

  const action = ActionCreator.changeCity(requiredState.city);

  // Act
  const newState = reducer(currentState, action);

  // Assert
  expect(newState.city).toEqual(requiredState.city);
  expect(newState.offers).toEqual(requiredState.offers);
});
