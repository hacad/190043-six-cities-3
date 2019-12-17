import reducerNames from "../reducerNames.js";
import {keysToCamel} from "../../utils.js";

const initialState = {
  city: {
    name: `Amsterdam`,
    location: {
      latitude: 52.373057,
      longitude: 4.892557,
      zoom: 13
    }},
  offers: [],
  cities: [],
  favorites: [],
  comments: []
};

const ActionType = {
  CHANGE_CITY: `${reducerNames.DATA}_CHANGE_CITY`,
  LOAD_OFFERS: `${reducerNames.DATA}_LOAD_OFFERS`,
  TOGGLE_FAVORITE: `${reducerNames.DATA}_TOGGLE_FAVORITE`,
  LOAD_FAVORITES: `${reducerNames.DATA}_LOAD_FAVORITES`,
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

  toggleFavorite: (offer) => {
    return {
      type: ActionType.TOGGLE_FAVORITE,
      payload: {
        offer
      }
    };
  },

  loadFavorites: (favoriteOffers) => {
    return {
      type: ActionType.LOAD_FAVORITES,
      payload: {
        favoriteOffers
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
      const cityMap = new Map();
      const cityNamesOrder = [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`];
      for (let cityName of cityNamesOrder) {
        cityMap.set(cityName, undefined);
      }

      for (let offer of action.payload.offers) {
        if (cityMap.has(offer.city.name) && !cityMap.get(offer.city.name)) {
          cityMap.set(offer.city.name, offer.city);
        }
      }

      const citiesList = [];
      for (let city of cityMap.values()) {
        citiesList.push(city);
      }

      Object.assign(newState, state, {
        offers: action.payload.offers,
        cities: citiesList
      });
      break;
    case ActionType.TOGGLE_FAVORITE:
      const updatedOffers = state.offers.map((offer) => {
        return offer.id === action.payload.offer.id ? action.payload.offer : offer;
      });

      Object.assign(newState, state, {
        offers: updatedOffers,
      });
      break;
    case ActionType.LOAD_FAVORITES:
      return Object.assign({}, state, {
        favorites: action.payload.favoriteOffers,
      });
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
        let offers = [];
        if (response && response.data) {
          offers = formatOffers(response.data);
          dispatch(ActionCreator.loadOffers(offers));
        }
        return offers;
      });
  },

  toggleFavorite: (placeId, isFavorite) => (dispatch, _, api) => {
    return api.post(`/favorite/${placeId}/${isFavorite ? 1 : 0}`)
      .then((response) => {
        let updatedOffers = [];
        if (response && response.data) {
          updatedOffers = formatOffers([response.data]);
          dispatch(ActionCreator.toggleFavorite(updatedOffers[0]));
        }

        return updatedOffers;
      });
  },

  loadFavorites: () => (dispatch, _, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        let favoriteOffers = [];
        if (response && response.data) {
          favoriteOffers = formatOffers(response.data);
          dispatch(ActionCreator.loadFavorites(favoriteOffers));
          dispatch(Operation.loadFavorites());
        }

        return favoriteOffers;
      });
  },

  loadComments: (hotelId) => (dispatch, _, api) => {
    return api.get(`/comments/${hotelId}`)
      .then((response) => {
        if (response && response.data) {
          const comments = formatComments(response.data);
          dispatch(ActionCreator.loadComments(comments));
        }
      });
  },

  postComment: (hotelId, review) => (dispatch, _, api) => {
    return api.post(`/comments/${hotelId}`, review)
      .then((response) => {
        const comments = formatComments(response.data);
        dispatch(ActionCreator.loadComments(comments));
      });
  }
};

function formatOffers(offers) {
  offers = keysToCamel(offers);
  for (let offer of offers) {
    offer.starRating = Math.round((offer.rating / 5) * 100);
  }

  return offers;
}

function formatComments(comments) {
  const monthNames = [`January`, `February`, `March`, `April`, `May`, `June`,
    `July`, `August`, `September`, `October`, `November`, `December`
  ];

  comments = keysToCamel(comments);
  for (let comment of comments) {
    comment.rating = Math.round((comment.rating / 5) * 100);
    comment.date = new Date(comment.date);
    comment.formattedDate = `${monthNames[comment.date.getMonth()]} ${comment.date.getFullYear()}`;
  }

  return comments;
}

export {ActionType, ActionCreator, data, Operation};
