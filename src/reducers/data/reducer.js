import reducerNames from "../reducerNames.js";
import {keysToCamel} from "../../utils.js";

const initialState = {
  city: {
    name: `Amsterdam`,
    location: {
      latitude: 52.373057,
      longitude: 4.892557,
      zoom: 10
    }},
  offers: [],
  cities: [],
  favorite: undefined
};

const ActionType = {
  CHANGE_CITY: `${reducerNames.DATA}_CHANGE_CITY`,
  LOAD_OFFERS: `${reducerNames.DATA}_LOAD_OFFERS`,
  TOGGLE_FAVORITE: `${reducerNames.DATA}_TOGGLE_FAVORITE`
};

const ActionCreator = {
  changeCity: (city) => {
    return {
      type: ActionType.CHANGE_CITY,
      payload: {
        city
      }
    };
  },

  loadOffers: (offers) => {
    return {
      type: ActionType.LOAD_OFFERS,
      payload: {
        offers
      }
    };
  },

  toggleFavorite: (placeId, isFavorite) => {
    return {
      type: ActionType.TOGGLE_FAVORITE,
      payload: {
        favorite: {
          placeId,
          isFavorite
        }
      }
    };
  }
};

const data = function (state = initialState, action) {
  let newState = {};

  switch (action.type) {
    case ActionType.CHANGE_CITY:
      Object.assign(newState, state, {
        city: action.payload.city
      });
      break;
    case ActionType.LOAD_OFFERS:
      const citiesSet = new Set();
      const citiesList = [];
      for (let offer of action.payload.offers) {
        if (!citiesSet.has(offer.city.name)) {
          citiesList.push(offer.city);
          citiesSet.add(offer.city.name);
        }
      }

      Object.assign(newState, state, {
        offers: action.payload.offers,
        cities: citiesList
      });
      break;
    case ActionType.TOGGLE_FAVORITE:
      Object.assign(newState, state, {
        favorite: action.payload.favorite
      });
      break;
    default:
      return state;
  }

  return newState;
};

const Operation = {
  loadOffers: () => (dispatch, _, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        const responseData = keysToCamel(response.data);
        dispatch(ActionCreator.loadOffers(responseData));
      });
  },

  toggleFavorite: (placeId, isFavorite) => (dispatch, getState) => {
    const promise = new Promise((resolve) => {
      setTimeout(resolve(), 1000);
    });

    return promise.then(() => {
      const offers = getState()[reducerNames.DATA].offers;
      const offer = offers.find((o) => o.id === placeId);
      offer.isFavorite = isFavorite;
      dispatch(ActionCreator.toggleFavorite(placeId, isFavorite));
    });
  }
};

export {ActionType, ActionCreator, data, Operation};
