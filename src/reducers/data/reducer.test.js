import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {data, ActionCreator, Operation, ActionType} from "./reducer.js";

it(`Reducer should return initial state by default`, () => {
  // Arrange
  const initialState = {
    city: {name: `Amsterdam`, location: {latitude: 52.38333, longitude: 4.9}},
    offers: [],
    cities: []
  };

  // Act
  const reducerIntialState = data(undefined, {});

  // Assert
  expect(reducerIntialState.city.name).toEqual(initialState.city.name);
  expect(reducerIntialState.offers).toEqual(initialState.offers);
});

it(`Reducer should change city and offers`, () => {
  // Arrange
  const currentState = {
    city: {
      name: `Amsterdam`
    }
  };

  const requiredState = {
    city: {
      name: `Paris`
    }
  };

  const action = ActionCreator.changeCity(requiredState.city);

  // Act
  const newState = data(currentState, action);

  // Assert
  expect(newState).toEqual(requiredState);
});

it(`Reducer should make correct API call`, () => {
  // Arrange
  const dispatch = jest.fn();
  const api = createAPI(dispatch);
  const apiMock = new MockAdapter(api);
  const loadOffers = Operation.loadOffers();

  apiMock
    .onGet(`/hotels`)
    .reply(200, []);

  // Act & Assert
  return loadOffers(dispatch, jest.fn(), api)
    .then(() => {
      expect(dispatch).toBeCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.LOAD_OFFERS,
        payload: {offers: []}
      });
    });
});
