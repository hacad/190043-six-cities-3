import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {data, ActionCreator, Operation, ActionType} from "./reducer.js";

it(`Reducer should return initial state by default`, () => {
  // Arrange
  const initialState = {
    city: {name: `Amsterdam`, location: {latitude: 52.38333, longitude: 4.9}},
    offers: [],
    cities: [],
    comments: []
  };

  // Act
  const reducerIntialState = data(undefined, {});

  // Assert
  expect(reducerIntialState.city.name).toEqual(initialState.city.name);
  expect(reducerIntialState.offers).toEqual(initialState.offers);
  expect(reducerIntialState.comments).toEqual(initialState.comments);
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

it(`Reducer should make correct API call load offers`, () => {
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

it(`Reducer should make correct API call to load comments`, () => {
  // Arrange
  const dispatch = jest.fn();
  const api = createAPI(dispatch);
  const apiMock = new MockAdapter(api);
  const loadComments = Operation.loadComments(1);

  apiMock
    .onGet(`/comments/1`)
    .reply(200, []);

  // Act & Assert
  return loadComments(dispatch, jest.fn(), api)
    .then(() => {
      expect(dispatch).toBeCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.LOAD_COMMENTS,
        payload: {comments: []}
      });
    });
});

it(`Reducer should change comments`, () => {
  // Arrange
  const currentState = {
    comments: []
  };

  const requiredState = {
    comments: [
      {
        "id": 1,
        "user": {
          "id": 18,
          "isPro": true,
          "name": `Sophie`,
          "avatarUrl": `https://htmlacademy-react-2.appspot.com/six-cities/static/avatar/9.jpg`
        },
        "rating": 4,
        "comment": `The deluxe room was a quite comfortable one with all the adequate facilities. The only thing that made me feel uncomfortable was the rude behavior of an impolite staff at the reception desk.`,
        "date": new Date(`2019-12-03T14:11:47.471Z`)
      }
    ]};

  const action = ActionCreator.loadComments(requiredState.comments);

  // Act
  const newState = data(currentState, action);

  // Assert
  expect(newState).toEqual(requiredState);
});
