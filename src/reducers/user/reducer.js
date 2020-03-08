import ReducerNames from "../reducer-names.js";
import {applyCamelCase} from "../../utils.js";
import history from "../../history.js";

const initialState = {
  isAuthorized: false,
  user: undefined
};

const ActionType = {
  REQUIRE_AUTHORIZATION: `${ReducerNames.USER}_REQUIRE_AUTHORIZATION`,
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
        const data = applyCamelCase(response.data);
        data.avatarUrl = `${api.defaults.baseURL}${data.avatarUrl}`;
        dispatch(ActionCreator.requireAuthorization(false, data));

        history.push(`/`);
      })
      .catch(() => {
        dispatch(ActionCreator.requireAuthorization(true, undefined));
      });
  }
};

export {ActionType, ActionCreator, user, Operation};
