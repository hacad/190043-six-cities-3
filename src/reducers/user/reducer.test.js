import {user, ActionCreator} from "./reducer.js";

it(`Reducer should return initial state by default`, () => {
  // Arrange
  const initialState = {
    isAuthorized: false,
    user: undefined
  };

  // Act
  const reducerIntialState = user(undefined, {});

  // Assert
  expect(reducerIntialState).toEqual(initialState);
});

it(`Reducer should require authorization`, () => {
  // Arrange
  const currentState = {
    isAuthorized: true,
    user: undefined
  };

  const requiredState = {
    isAuthorized: false,
    user: undefined
  };
  const action = ActionCreator.requireAuthorization(true);

  // Act
  const newState = user(currentState, action);

  // Assert
  expect(newState).toEqual(requiredState);
});

it(`Reducer should login user`, () => {
  // Arrange
  const currentState = {
    isAuthorized: false,
    user: undefined
  };

  const requiredState = {
    isAuthorized: true,
    user: {
      name: `test`
    }
  };
  const action = ActionCreator.requireAuthorization(false, {name: `test`});

  // Act
  const newState = user(currentState, action);

  // Assert
  expect(newState).toEqual(requiredState);
});

it(`Reducer should logout user`, () => {
  // Arrange
  const currentState = {
    isAuthorized: true,
    user: {
      name: `test`
    }
  };

  const requiredState = {
    isAuthorized: false,
    user: undefined
  };
  const action = ActionCreator.requireAuthorization(true, undefined);

  // Act
  const newState = user(currentState, action);

  // Assert
  expect(newState).toEqual(requiredState);
});
