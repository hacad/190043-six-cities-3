import {user, ActionCreator} from "./reducer.js";

it(`Reducer should return initial state by default`, () => {
  // Arrange
  const initialState = {
    isAuthorizationRequired: false
  };

  // Act
  const reducerIntialState = user(undefined, {});

  // Assert
  expect(reducerIntialState).toEqual(initialState);
});

it(`Reducer should require authorization`, () => {
  // Arrange
  const currentState = {
    isAuthorizationRequired: false
  };

  const requiredState = {
    isAuthorizationRequired: true
  };
  const action = ActionCreator.requireAuthorization(true);

  // Act
  const newState = user(currentState, action);

  // Assert
  expect(newState).toEqual(requiredState);
});
