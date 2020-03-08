import reducerNames from "../reducerNames.js";
import {keysToCamel} from "../../utils.js";
import history from "../../history.js";

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
  favorite: undefined,
  comments: []
};

const ActionType = {
  CHANGE_CITY: `${reducerNames.DATA}_CHANGE_CITY`,
  LOAD_OFFERS: `${reducerNames.DATA}_LOAD_OFFERS`,
  TOGGLE_FAVORITE: `${reducerNames.DATA}_TOGGLE_FAVORITE`,
  LOAD_COMMENTS: `${reducerNames.DATA}_LOAD_COMMENTS`
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
  },

  loadComments: (comments) => {
    return {
      type: ActionType.LOAD_COMMENTS,
      payload: {
        comments
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
    case ActionType.TOGGLE_FAVORITE:
      Object.assign(newState, state, {
        favorite: action.payload.favorite
      });
      break;
    case ActionType.LOAD_COMMENTS:
      Object.assign(newState, state, {
        comments: action.payload.comments,
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
        const offers = keysToCamel(response.data);
        for (let offer of offers) {
          offer.starRating = Math.round((offer.rating / 5) * 100);
        }
        dispatch(ActionCreator.loadOffers(offers));

        return offers;
      });
  },

  toggleFavorite: (placeId, isFavorite) => (dispatch, getState) => {
    const promise = new Promise((resolve) => {
      setTimeout(resolve(), 1000);
    });

    return promise.then(() => {
      if (!getState()[reducerNames.USER].isAuthorized) {
        history.push(`/login`);
      } else {
        const offers = getState()[reducerNames.DATA].offers;
        const offer = offers.find((o) => o.id === placeId);
        offer.isFavorite = isFavorite;
        dispatch(ActionCreator.toggleFavorite(placeId, isFavorite));
      }
    });
  },

  loadComments: (hotelId) => (dispatch, _, api) => {
    return api.get(`/comments/${hotelId}`)
      .then((response) => {
        const monthNames = [`January`, `February`, `March`, `April`, `May`, `June`,
          `July`, `August`, `September`, `October`, `November`, `December`
        ];

        const comments = keysToCamel(response.data);
        for (let comment of comments) {
          comment.rating = Math.round((comment.rating / 5) * 100);
          comment.date = new Date(comment.date);
          comment.formattedDate = `${monthNames[comment.date.getMonth()]} ${comment.date.getFullYear()}`;
        }
        dispatch(ActionCreator.loadComments(comments));
      });
  }
};

export {ActionType, ActionCreator, data, Operation};
