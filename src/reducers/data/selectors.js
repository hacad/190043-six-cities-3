import {createSelector} from "reselect";
import reducerNames from "../reducerNames.js";

const getOffers = (state) => state[reducerNames.DATA].offers;
export const getCity = (state) => state[reducerNames.DATA].city;
export const getCities = (state) => state[reducerNames.DATA].cities;
export const getSelectedPlaces = createSelector(
    getOffers,
    getCity,
    (offers, city) =>
      offers
        .filter((offer) => offer.city.name === city.name)
);
export const getOfferById = (id, state) => {
  return getOffers(state).filter((offer) => offer.id === id)[0];
};
export const getFavorites = (state) => {
  const favorites = state[reducerNames.DATA].favorites;
  let favoritesGroupedByCity = {};

  for (let favorite of favorites) {
    if (!favoritesGroupedByCity.hasOwnProperty(favorite.city.name)) {
      favoritesGroupedByCity[favorite.city.name] = [];
    }
    favoritesGroupedByCity[favorite.city.name].push(favorite);
  }

  const cities = getCities(state);
  return cities
    .map((c) => {
      return {
        city: c,
        places: favoritesGroupedByCity.hasOwnProperty(c.name)
          ? favoritesGroupedByCity[c.name]
          : []
      };
    })
    .filter((f) => f.places && f.places.length);
};
export const getComments = (state) => state[reducerNames.DATA].comments;
