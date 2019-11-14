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
