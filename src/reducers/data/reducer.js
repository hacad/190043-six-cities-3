import reducerNames from "../reducerNames.js";

const initialState = {
  city: {
    name: `Amsterdam`,
    location: {
      latitude: 52.373057,
      longitude: 4.892557,
      zoom: 10
    }},
  offers: [],
  cities: []
};

const ActionType = {
  CHANGE_CITY: `${reducerNames.DATA}_CHANGE_CITY`,
  LOAD_OFFERS: `${reducerNames.DATA}_LOAD_OFFERS`
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
    default:
      return state;
  }

  return newState;
};

const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.loadOffers(response.data));
      });
  }
};

export {ActionType, ActionCreator, data, Operation};
