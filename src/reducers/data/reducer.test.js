import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {data, ActionCreator, Operation, ActionType} from "./reducer.js";
import {defaultSortingOptionItem} from "../../mocks/places-sorting-options.js";

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
    },
    placeSortingOption: {
      caption: `Price: high to low`,
      value: `price`,
      order: `DESC`
    }
  };

  const requiredState = {
    city: {
      name: `Paris`
    },
    placeSortingOption: defaultSortingOptionItem
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
        payload: {offers: [], cities: []}
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

it(`Reducer should correct toggle favorite offer`, () => {
  // Arrange
  const currentState = {
    city: {name: `Paris`, location: {latitude: 48.856663, longitude: 2.351556}},
    offers: [
      {
        id: 16,
        city: {
          name: `Paris`,
          location: {
            latitude: 48.856663,
            longitude: 2.351556,
            zoom: 10
          }
        },
        type: `Apartment`,
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
      },
      {
        id: 15,
        city: {
          name: `Hamburg`,
          location: {
            latitude: 53.552645,
            longitude: 9.966287,
            zoom: 10
          }
        },
        type: `Apartment`,
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
      }
    ],
    cities: [],
    comments: []
  };

  const requiredState = JSON.parse(JSON.stringify(currentState));
  const requiredOffer = requiredState.offers.find((o) => o.id === 16);
  requiredOffer.isFavorite = true;

  const notModifiedRequiredStateOffer = currentState.offers.find((o) => o.id === 15);

  // Act
  const action = ActionCreator.toggleFavorite(requiredOffer);
  const newState = data(currentState, action);
  const newOffer = newState.offers.find((o) => o.id === 16);
  const notModifiedNewStateOffer = newState.offers.find((o) => o.id === 15);

  // Assert
  expect(newOffer.isFavorite).toEqual(requiredOffer.isFavorite);
  expect(notModifiedNewStateOffer).toEqual(notModifiedRequiredStateOffer);
  expect(newState.city).toEqual(currentState.city);
});

it(`Reducer should make correct API call to toggle favorite`, () => {
  // Arrange
  const dispatch = jest.fn();
  const api = createAPI(dispatch);
  const apiMock = new MockAdapter(api);
  const toggleFavorite = Operation.toggleFavorite(1, 1);

  apiMock
    .onPost(`/favorite/1/1`)
    .reply(200, {rating: 5});

  // Act & Assert
  return toggleFavorite(dispatch, jest.fn(), api)
    .then(() => {
      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.TOGGLE_FAVORITE,
        payload: {offer: {rating: 5, starRating: 100}}
      });
    });
});

it(`Reducer should change favorites`, () => {
  // Arrange
  const currentState = {
    favorites: []
  };

  const requiredState = {
    favorites: [
      {
        id: 16,
        city: {
          name: `Paris`,
          location: {
            latitude: 48.856663,
            longitude: 2.351556,
            zoom: 10
          }
        },
        type: `Apartment`,
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
      }
    ]};

  const action = ActionCreator.loadFavorites(requiredState.favorites);

  // Act
  const newState = data(currentState, action);

  // Assert
  expect(newState).toEqual(requiredState);
});

it(`Reducer should make correct API call to load favorites`, () => {
  // Arrange
  const dispatch = jest.fn();
  const api = createAPI(dispatch);
  const apiMock = new MockAdapter(api);
  const loadFavorites = Operation.loadFavorites(1);

  apiMock
    .onGet(`/favorite`)
    .reply(200, []);

  // Act & Assert
  return loadFavorites(dispatch, jest.fn(), api)
    .then(() => {
      expect(dispatch).toBeCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.LOAD_FAVORITES,
        payload: {favoriteOffers: []}
      });
    });
});

it(`Reducer should change order`, () => {
  // Arrange
  const currentState = {
    placeSortingOption: {
      caption: `Price: high to low`,
      value: `price`,
      order: `DESC`
    }
  };

  const requiredState = {
    placeSortingOption: {
      caption: `Top rated first`,
      value: `rating`,
      order: `DESC`
    }
  };

  const action = ActionCreator.changeSorting(requiredState.placeSortingOption);

  // Act
  const newState = data(currentState, action);

  // Assert
  expect(newState).toEqual(requiredState);
});

it(`Reducer should change active offer`, () => {
  // Arrange
  const currentState = {
    activeOffer: undefined
  };

  const requiredState = {
    activeOffer: {}
  };

  const action = ActionCreator.changeActiveOffer(requiredState.activeOffer);

  // Act
  const newState = data(currentState, action);

  // Assert
  expect(newState).toEqual(requiredState);
});
