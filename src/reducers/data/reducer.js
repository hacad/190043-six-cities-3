import ReducerNames from "../reducer-names.js";
import {applyCamelCase} from "../../utils.js";
import {defaultSortingOptionItem} from "../../mocks/places-sorting-options.js";

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
  comments: [],

  placeSortingOption: defaultSortingOptionItem,
  activeOffer: undefined
};

const ActionType = {
  CHANGE_CITY: `${ReducerNames.DATA}_CHANGE_CITY`,
  LOAD_OFFERS: `${ReducerNames.DATA}_LOAD_OFFERS`,
  TOGGLE_FAVORITE: `${ReducerNames.DATA}_TOGGLE_FAVORITE`,
  LOAD_FAVORITES: `${ReducerNames.DATA}_LOAD_FAVORITES`,
  LOAD_COMMENTS: `${ReducerNames.DATA}_LOAD_COMMENTS`,
  CHANGE_SORTING: `${ReducerNames.DATA}_CHANGE_SORTING`,
  CHANGE_ACTIVE_OFFER: `${ReducerNames.DATA}_CHANGE_ACTIVE_OFFER`
};

const ActionCreator = {
  changeCity: (city) => {
    return {
      type: ActionType.CHANGE_CITY,
      payload: {
        city,
        placeSortingOption: defaultSortingOptionItem
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

  changeSorting: (placeSortingOption) => {
    return {
      type: ActionType.CHANGE_SORTING,
      payload: {
        placeSortingOption
      }
    };
  },

  changeActiveOffer: (activeOffer) => {
    return {
      type: ActionType.CHANGE_ACTIVE_OFFER,
      payload: {
        activeOffer
      }
    };
  }
};

const data = function (state = initialState, action) {
  let newState = {};

  switch (action.type) {
    case ActionType.CHANGE_CITY:
      Object.assign(newState, state, {
        city: action.payload.city,
        placeSortingOption: action.payload.placeSortingOption
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
      const updatedOffers = state.offers.map((offer) => {
        return offer.id === action.payload.offer.id ? action.payload.offer : offer;
      });

      Object.assign(newState, state, {
        offers: updatedOffers,
      });
      break;
    case ActionType.LOAD_FAVORITES:
      Object.assign(newState, state, {
        favorites: action.payload.favoriteOffers,
      });
      break;
    case ActionType.LOAD_COMMENTS:
      Object.assign(newState, state, {
        comments: action.payload.comments,
      });
      break;
    case ActionType.CHANGE_SORTING:
      Object.assign(newState, state, {
        placeSortingOption: action.payload.placeSortingOption,
      });
      break;
    case ActionType.CHANGE_ACTIVE_OFFER:
      Object.assign(newState, state, {
        activeOffer: action.payload.activeOffer,
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
  offers = applyCamelCase(offers);
  for (let offer of offers) {
    offer.starRating = Math.round((offer.rating / 5) * 100);
  }

  return offers;
}

function formatComments(comments) {
  const MONTH_NAMES = [`January`, `February`, `March`, `April`, `May`, `June`,
    `July`, `August`, `September`, `October`, `November`, `December`
  ];

  comments = applyCamelCase(comments);
  for (let comment of comments) {
    comment.rating = Math.round((comment.rating / 5) * 100);
    comment.date = new Date(comment.date);
    comment.formattedDate = `${MONTH_NAMES[comment.date.getMonth()]} ${comment.date.getFullYear()}`;
  }

  comments.sort((a, b) => b.date - a.date);
  return comments;
}

export {ActionType, ActionCreator, data, Operation};
