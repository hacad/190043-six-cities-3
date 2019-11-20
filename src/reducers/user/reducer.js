import reducerNames from "../reducerNames.js";
import {keysToCamel} from "../../utils.js";

const initialState = {
  isAuthorized: false,
  user: undefined
};

const ActionType = {
  REQUIRE_AUTHORIZATION: `${reducerNames.USER}_REQUIRE_AUTHORIZATION`,
  LOGIN: `${reducerNames.USER}_LOGIN`,
  LOGOUT: `${reducerNames.USER}_LOGOUT`
};

const ActionCreator = {
  requireAuthorization: (status, user) => {
    return {
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: {
        status,
        user
      }
    };
  },
/*
  login: (user) => {
    return {
      type: ActionType.LOGIN,
      payload: {
        user
      }
    };
  },

  logout: () => {
    return {
      type: ActionType.LOGOUT,
      payload: {
        user: undefined
      }
    };
  }
  */
};

const user = function (state = initialState, action) {
  let newState = {};

  switch (action.type) {
    case ActionType.REQUIRE_AUTHORIZATION:
      Object.assign(newState, state, {
        isAuthorized: !action.payload.status,
        user: action.payload.user
      });
      break;
    /*
    case ActionType.LOGIN:
      Object.assign(newState, state, {
        user: action.payload.user
      });
      break;
    case ActionType.LOGOUT:
      Object.assign(newState, state, {
        user: action.payload.user
      });
      break;
    */
    default:
      return state;
  }

  return newState;
};

const Operation = {
  login: (form) => (dispatch, _, api) => {
    api
      .post(`/login`, form)
      .then((response) => {
        const data = keysToCamel(response.data);
        data.avatarUrl = `${api.defaults.baseURL}${data.avatarUrl}`;
        dispatch(ActionCreator.requireAuthorization(false, data));
      })
      .catch(() => {
        dispatch(ActionCreator.requireAuthorization(true, undefined));
      });
  },

  logout: () => (dispatch) => {
    dispatch(ActionCreator.requireAuthorization(true, undefined));
  }
};

export {ActionType, ActionCreator, user, Operation};
