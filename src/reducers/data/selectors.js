import {createSelector} from "reselect";
import reducerNames from "../reducer-names.js";

const getOffers = (state) => state[reducerNames.DATA].offers;
export const getSortingOption = (state) => state[reducerNames.DATA].placeSortingOption;
export const getCity = (state) => state[reducerNames.DATA].city;
export const getCities = (state) => state[reducerNames.DATA].cities;
export const getSelectedPlaces = createSelector(
    getOffers,
    getCity,
    getSortingOption,
    (offers, city, placeSortingOption) => {
      let sortedOffers = offers.filter((offer) => offer.city.name === city.name);
      if (placeSortingOption && placeSortingOption.order) {
        sortedOffers = sortByOrder(sortedOffers, placeSortingOption.value, placeSortingOption.order);
      }

      return sortedOffers;
      function sortByOrder(arr, value, order) {
        switch (order) {
          case `ASC`: return arr.sort((a, b) => a[value] - b[value]);
          case `DESC`: return arr.sort((a, b) => b[value] - a[value]);
          default: return arr;
        }
      }
    }
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
