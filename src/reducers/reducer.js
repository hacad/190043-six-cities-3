import {default as mockOffers} from "../mocks/offers";

const intialCityName = `Amsterdam`;
const initialState = {
  city: mockOffers.filter((cityPlace) => cityPlace.city.name === intialCityName)[0].city,
  offers: mockOffers.filter((cityPlace) => cityPlace.city.name === intialCityName),
  allOffers: mockOffers
};

const CHANGE_CITY = `CHANGE_CITY`;

const ActionCreator = {
  changeCity: (city) => {
    return {
      type: CHANGE_CITY,
      payload: {
        city,
        offers: initialState
          .allOffers
          .filter((cityPlace) => cityPlace.city.name === city.name)
      }
    };
  }
};

const reducer = function (state = initialState, action) {
  let newState = {};

  switch (action.type) {
    case CHANGE_CITY:
      Object.assign(newState, state, {
        city: action.payload.city,
        offers: action.payload.offers
      });
      break;
    default:
      Object.assign(newState, state);
  }

  return newState;
};

export {ActionCreator, reducer};
